import { ApolloLink, CombinedGraphQLErrors, HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";
import { SetContextLink } from "@apollo/client/link/context";
import { ErrorLink } from "@apollo/client/link/error";
import { from } from "rxjs";
import { filter, mergeMap } from "rxjs/operators";

import { getSession } from "./actions";
import { BACKEND_GRAPHQL_URL } from "./constants";
import { fetchRefreshToken } from "./api/auth.api";

const authLink = new SetContextLink(async (previousCtx) => {
  const newAccessToken = await getSession();
  if (newAccessToken?.accessToken) {
    return {
      headers: {
        ...previousCtx.headers,
        Authorization: `Bearer ${newAccessToken.accessToken}`,
      },
    };
  }

  return {
    headers: {
      ...previousCtx.headers,
    },
  };
});


const errorLink = new ErrorLink(({ error, operation, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    for (const { extensions } of error.errors) {
      if (extensions?.code && extensions.code === "UNAUTHENTICATED") {
        return from(fetchRefreshToken()).pipe(
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
