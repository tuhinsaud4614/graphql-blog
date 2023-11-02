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

import { getNextAuthJWTToken } from "@/lib/next-server-api";
import { getAuthUser } from "@/lib/utils";

export function ApolloProvider({ children }: React.PropsWithChildren) {
  const client = React.useMemo(() => {
    const errorLink = onError(({ graphQLErrors, operation, forward }) => {
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          if (
            err?.extensions?.code &&
            err.extensions.code === "UNAUTHENTICATED"
          ) {
            return fromPromise(getNextAuthJWTToken())
              .filter((value) => Boolean(value))
              .flatMap((newAccessToken) => {
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: newAccessToken
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

      try {
        const newAccessToken = await getNextAuthJWTToken();
        return {
          headers: {
            ...headers,
            Authorization: newAccessToken ? `Bearer ${newAccessToken}` : null,
          },
        };
      } catch (error) {
        return {
          headers: {
            ...headers,
          },
        };
      }
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
