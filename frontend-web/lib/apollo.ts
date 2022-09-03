import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  from,
  InMemoryCache,
  NormalizedCacheObject,
  Operation,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { mergeDeep, Observable } from "@apollo/client/utilities";
import { setAuthUser } from "@features";
import { createUploadLink } from "apollo-upload-client";
import { getOperationAST, print } from "graphql";
import { useMemo } from "react";
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

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

type SSELinkOptions = EventSourceInit & {
  uri: string;
};

class SSELink extends ApolloLink {
  constructor(private options: SSELinkOptions) {
    super();
  }

  public request(operation: Operation): Observable<FetchResult> {
    const url = new URL(this.options.uri);
    url.searchParams.append("query", print(operation.query));

    // if (operation.operationName) {
    //   url.searchParams.append(
    //     "operationName",
    //     JSON.stringify(operation.operationName)
    //   );
    // }

    if (operation.variables) {
      url.searchParams.append("variables", JSON.stringify(operation.variables));
    }

    if (operation.extensions) {
      if (getAccessToken()) {
        operation.extensions.headers = {
          ...operation.extensions.headers,
          Authorization: `Bearer ${getAccessToken()}`,
        };
      }
      url.searchParams.append(
        "extensions",
        JSON.stringify(operation.extensions)
      );
    }

    return new Observable((sink) => {
      const eventsource = new EventSource(url.toString(), this.options);
      eventsource.onmessage = function (event) {
        const data = JSON.parse(event.data);
        sink.next(data);
        if (eventsource.readyState === 2) {
          sink.complete();
        }
      };
      eventsource.onerror = function (error) {
        sink.error(error);
      };
      return () => eventsource.close();
    });
  }
}

const uri = `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/graphql`;

const sseLink = new SSELink({
  uri,
  withCredentials: true,
});

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
  sseLink,
  httpLink
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
  }
);

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
  serverAccessToken?: string
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
  pageProps: { props: any }
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
