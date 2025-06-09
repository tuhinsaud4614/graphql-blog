import { ApolloLink, HttpLink, fromPromise } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import { BACKEND_GRAPHQL_URL } from "./constants";
import { getAccessTokenFromNextAuth } from "./next-server-api";
import { fetchRefreshToken } from "./utils";

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
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      if (err?.extensions?.code && err.extensions.code === "UNAUTHENTICATED") {
        return fromPromise(fetchRefreshToken())
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

export const {
  getClient,
  query: gqlRSCQuery,
  PreloadQuery,
} = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      authLink,
      errorLink,
      new HttpLink({ credentials: "include", uri: BACKEND_GRAPHQL_URL }),
    ]),
  });
});
