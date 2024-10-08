"use client";

/* This is setup with https://www.npmjs.com/package/@apollo/experimental-nextjs-app-support */
import * as React from "react";

import { ApolloLink, fromPromise, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { YogaLink } from "@graphql-yoga/apollo-link";
import { Kind, OperationTypeNode, getOperationAST } from "graphql";
import { signOut } from "next-auth/react";

import { BACKEND_GRAPHQL_URL, ROUTES } from "@/lib/constants";
import { getAccessTokenFromNextAuth } from "@/lib/next-server-api";
import createUploadLink from "@/lib/uploadLink";

async function retryRefreshToken() {
  try {
    const newAccessToken = await getAccessTokenFromNextAuth();
    if (!newAccessToken) {
      await signOut({ callbackUrl: ROUTES.landing, redirect: true });
      return null;
    }

    return newAccessToken;
  } catch (_) {
    return null;
  }
}

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err?.extensions?.code && err.extensions.code === "UNAUTHENTICATED") {
        return fromPromise(retryRefreshToken())
          .filter((value) => Boolean(value))
          .flatMap((newAccessToken) => {
            const oldHeaders = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...oldHeaders,
                Authorization: newAccessToken
                  ? `Bearer ${newAccessToken}`
                  : undefined,
              },
            });

            // retry the request, returning the new observable
            return forward(operation);
          });
      }
    }
  }
});

const yogaLink = split(
  ({ query, operationName }) => {
    const definition = getOperationAST(query, operationName);
    return (
      definition?.kind === Kind.OPERATION_DEFINITION &&
      definition.operation === OperationTypeNode.SUBSCRIPTION
    );
  },
  new YogaLink({ credentials: "include", endpoint: BACKEND_GRAPHQL_URL }),
  createUploadLink({
    uri: BACKEND_GRAPHQL_URL,
    credentials: "include",
    fetchOptions: { cache: "no-store" },
  }),
);

const authLink = setContext(async (_, { headers }) => {
  const newAccessToken = await getAccessTokenFromNextAuth();
  if (newAccessToken) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${newAccessToken}`,
      },
    };
  }

  return {
    headers: {
      ...headers,
    },
  };
});

export function ApolloProvider({
  children,
}: Readonly<React.PropsWithChildren>) {
  const client = React.useMemo(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link:
        typeof window === "undefined"
          ? ApolloLink.from([
              new SSRMultipartLink({
                stripDefer: true,
              }),
              authLink,
              errorLink,
              yogaLink,
            ])
          : ApolloLink.from([authLink, errorLink, yogaLink]),
    });
  }, []);

  return (
    <ApolloNextAppProvider makeClient={() => client}>
      {children}
    </ApolloNextAppProvider>
  );
}
