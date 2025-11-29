"use client";

/* This is setup with https://www.npmjs.com/package/@apollo/client-integration-nextjs */
import * as React from "react";

import { from } from "rxjs";
import { filter, mergeMap } from "rxjs/operators";

import { ApolloLink, CombinedGraphQLErrors, setLogVerbosity } from "@apollo/client";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/client-integration-nextjs";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";

import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { } from "@apollo/client/link/http";
import { YogaLink } from "@graphql-yoga/apollo-link";
import { getOperationAST, Kind, OperationTypeNode } from "graphql";

import { retryRefreshToken } from "@/lib/actions";
import { BACKEND_GRAPHQL_URL } from "@/lib/constants";
import createUploadLink from "@/lib/uploadLink";

import { isDev } from "@/lib/isType";
import { Defer20220824Handler } from "@apollo/client/incremental";
import { useSession } from "./SessionProvider";


if (isDev()) {
  setLogVerbosity("debug");
  loadDevMessages();
  loadErrorMessages();
}

function makeClient(accessToken?: string | null) {
  const errorLink = new ErrorLink(({ error: graphQLErrors, operation, forward }) => {
    if (CombinedGraphQLErrors.is(graphQLErrors)) {
      for (const err of graphQLErrors.errors) {
        if (
          err?.extensions?.code &&
          err.extensions.code === "UNAUTHENTICATED"
        ) {
          return from(retryRefreshToken()).pipe(
            filter((value) => Boolean(value)),
            mergeMap((newAccessToken) => {
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
            })
          );
        }
      }
    }
  });

  const yogaLink = ApolloLink.split(
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

  const authLink = new SetContextLink(({ headers }) => {
    if (accessToken) {
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };
    }

    return {
      headers: {
        ...headers,
      },
    };
  });

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
    incrementalHandler: new Defer20220824Handler(),
  });
}

export function ApolloProvider({
  children,
}: Readonly<React.PropsWithChildren>) {
  const session = useSession();
  return (
    <ApolloNextAppProvider
      makeClient={() => makeClient(session.data?.accessToken)}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
