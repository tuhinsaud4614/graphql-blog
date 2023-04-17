import { useMemo } from "react";

import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  InMemoryCache,
  NormalizedCacheObject,
  Operation,
  from,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { Observable, mergeDeep } from "@apollo/client/utilities";
import { YogaLink } from "@graphql-yoga/apollo-link";
import { createUploadLink } from "apollo-upload-client";
import { getOperationAST, print } from "graphql";
import { makeStore } from "store";
// import { store } from "store";
import {
  fetchRefreshToken,
  getAccessToken,
  getAuthUser,
  isDev,
  isServer,
  setAccessToken,
} from "utils";

import { setAuthUser } from "@/features";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

const uri = `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/graphql`;

const httpLink = createUploadLink({
  uri,
  credentials: "include",
});

const link = split(
  ({ query, operationName }) => {
    const definition = getOperationAST(query, operationName);

    return (
      definition?.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  new YogaLink({ credentials: "include", endpoint: uri }),
  httpLink,
);
let apolloClient: ApolloClient<NormalizedCacheObject> | null;

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (
          err?.extensions?.code &&
          err.extensions.code === "UNAUTHENTICATED"
        ) {
          setAccessToken(null);
          return forward(operation);
        }
      }
    }
  },
);

const x = new YogaLink({ credentials: "include", endpoint: uri });

export function createApolloClient(serverAccessToken?: string) {
  const authLink = setContext(async (_, { headers }) => {
    if (isServer()) {
      const token = serverAccessToken ? `Bearer ${serverAccessToken}` : "";

      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    }

    const user = getAuthUser(getAccessToken() || undefined);
    if (user && user.exp * 1000 < Date.now()) {
      return {
        headers: {
          ...headers,
          Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : "",
        },
      };
    }

    try {
      const token = await fetchRefreshToken();
      setAccessToken(token);
      if (token) {
        const user = getAuthUser(token);
        makeStore().dispatch(setAuthUser({ token, user }));
      } else {
        makeStore().dispatch(setAuthUser({ token: null, user: null }));
      }
      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    } catch (error) {
      makeStore().dispatch(setAuthUser({ token: null, user: null }));
      return {
        headers: {
          ...headers,
          Authorization: "",
        },
      };
    }
  });
  return new ApolloClient({
    connectToDevTools: isDev(),
    ssrMode: isServer(),
    link: from([errorLink, authLink, link]),
    cache: new InMemoryCache(),
    credentials: "include",
  });
}

export function initializeApollo(
  initialState = null,
  serverAccessToken?: string,
) {
  const _apolloClient = apolloClient ?? createApolloClient(serverAccessToken);
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = mergeDeep(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: { props: any },
) {
  pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);
  return store;
}
export default useApollo;
