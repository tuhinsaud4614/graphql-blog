"use client";

/* This is setup with https://www.npmjs.com/package/@apollo/experimental-nextjs-app-support */
import * as React from "react";

import { ApolloLink, HttpLink, fromPromise } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { signOut } from "next-auth/react";

import { ROUTES } from "@/lib/constants";
import { getNextAuthJWTToken } from "@/lib/next-server-api";
import { getAuthUser } from "@/lib/utils";

async function retryRefreshToken() {
  try {
    const newAccessToken = await getNextAuthJWTToken();
    if (!newAccessToken) {
      await signOut({ callbackUrl: ROUTES.landing, redirect: true });
      return null;
    }

    return newAccessToken;
  } catch (e) {
    return null;
  }
}

export function ApolloProvider({ children }: React.PropsWithChildren) {
  const client = React.useMemo(() => {
    const errorLink = onError(({ graphQLErrors, operation, forward }) => {
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          if (
            err?.extensions?.code &&
            err.extensions.code === "UNAUTHENTICATED"
          ) {
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

    const authLink = setContext(async (_, { headers }) => {
      const newAccessToken = await getNextAuthJWTToken();

      const user = getAuthUser(newAccessToken);
      if (user && user.exp * 1000 < Date.now()) {
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

    const httpLink = new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      fetchOptions: { cache: "no-store" },
      credentials: "include",
    });

    return new NextSSRApolloClient({
      cache: new NextSSRInMemoryCache(),
      link:
        typeof window === "undefined"
          ? ApolloLink.from([
              new SSRMultipartLink({
                stripDefer: true,
              }),
              authLink,
              errorLink,
              httpLink,
            ])
          : ApolloLink.from([authLink, errorLink, httpLink]),
    });
  }, []);

  return (
    <ApolloNextAppProvider makeClient={() => client}>
      {children}
    </ApolloNextAppProvider>
  );
}
