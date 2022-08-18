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
import { mergeDeep, Observable } from "@apollo/client/utilities";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { createUploadLink } from "apollo-upload-client";
import { getCookie } from "cookies-next";
import { getOperationAST, print } from "graphql";
import { useMemo } from "react";
import {
  fetchRefreshToken,
  getAuthUser,
  isDev,
  isServer,
  removeLocalStorageValue,
  removeTokenFromCookie,
} from "utils";
import { USER_KEY } from "utils/constants";

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
    url.searchParams.append(
      "extensions",
      JSON.stringify(operation.operationName)
    );
    url.searchParams.append("variables", JSON.stringify(operation.variables));
    if (operation.extensions) {
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

export function createApolloClient(serverAccessToken?: string) {
  const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      try {
        const token = getCookie("accessToken");

        if (!token || typeof token !== "string") {
          return true;
        }
        const user = getAuthUser(token);
        if (user && user.exp * 1000 > Date.now()) {
          return true;
        }
        return false;
      } catch (_) {
        return false;
      }
    },
    fetchAccessToken: async () => {
      const token = getCookie("refreshToken");
      if (!token || typeof token !== "string") {
        return;
      }
      return fetchRefreshToken(token);
    },
    handleResponse: () => (response: any) => {
      if (!response) return { accessToken: null, refreshToken: null };
      const accessToken = response.data?.token?.accessToken;
      const refreshToken = response.data?.token?.refreshToken;
      // if (accessToken && refreshToken) {
      //   const user = getAuthUser(refreshToken);
      //   // setCookie("refreshToken", refreshToken, { maxAge: user?.exp });
      // }
      return {
        accessToken,
        refreshToken,
      };
    },
    handleFetch(accessToken) {
      const user = getAuthUser(accessToken);
      // setCookie("accessToken", accessToken, { maxAge: user?.exp });
    },
    handleError: (error) => {
      removeTokenFromCookie();
      removeLocalStorageValue(USER_KEY);
      if (
        !isServer() &&
        (!navigator.onLine ||
          (error instanceof TypeError &&
            error.message === "Network request failed"))
      ) {
        isDev() && console.log("Offline -> do nothing 🍵");
      } else {
        isDev() && console.log("Online -> log out 👋");
      }
      isDev() && console.error("Cannot refresh access token:", error);
    },
  });
  const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = isServer()
      ? serverAccessToken
      : (getCookie("accessToken") as string);

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  return new ApolloClient({
    connectToDevTools: isDev(),
    ssrMode: isServer(),
    link: from([refreshLink, authLink, link]),
    cache: new InMemoryCache(),
    credentials: "same-origin",
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
