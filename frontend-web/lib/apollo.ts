import {
  ApolloClient,
  ApolloLink,
  FetchResult,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  Operation,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { mergeDeep, Observable } from "@apollo/client/utilities";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { getCookie, setCookie } from "cookies-next";
import { getOperationAST, print } from "graphql";
import { useMemo } from "react";
import { getAuthUser } from "utils";

type SSELinkOptions = EventSourceInit & { uri: string };

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

const uri = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "";

const sseLink = new SSELink({
  uri,
});

const httpLink = new HttpLink({
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

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getCookie("accessToken") as string;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const refreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    try {
      const token = getCookie("accessToken");
      if (typeof token !== "string") {
        return false;
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
    const query = `
      mutation Token($refreshToken: String!) {
        token(refreshToken: $refreshToken) {
          accessToken
          refreshToken
        }
      }
    `;
    const response = await fetch(
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: {
            refreshToken: token,
          },
        }),
      }
    );
    return response.json();
  },
  handleResponse: () => (response: any) => {
    if (!response) return { accessToken: null, refreshToken: null };

    const accessToken = response.data?.token?.accessToken;
    const refreshToken = response.data?.token?.refreshToken;
    if (accessToken && refreshToken) {
      const user = getAuthUser(refreshToken);
      setCookie("refreshToken", refreshToken, { maxAge: user?.exp });
    }
    return {
      accessToken: response.data?.token?.accessToken,
      refreshToken: response.data?.token?.refreshToken,
    };
  },
  handleFetch(accessToken) {
    const user = getAuthUser(accessToken);
    setCookie("accessToken", accessToken, { maxAge: user?.exp });
    if (process.env.NODE_ENV === "development") {
      console.info("accessToken", accessToken);
    }
  },
  handleError: (error) => {
    if (
      !navigator.onLine ||
      (error instanceof TypeError && error.message === "Network request failed")
    ) {
      process.env.NODE_ENV === "development" &&
        console.log("Offline -> do nothing 🍵");
    } else {
      process.env.NODE_ENV === "development" &&
        console.log("Online -> log out 👋");
    }
    process.env.NODE_ENV === "development" &&
      console.error("Cannot refresh access token:", error);
  },
});

let gqlClient: ApolloClient<NormalizedCacheObject>;

export function createApolloClient() {
  return new ApolloClient({
    connectToDevTools: process.env.NODE_ENV === "development",
    ssrMode: typeof window === "undefined",
    link: authLink.concat(refreshLink).concat(link),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = gqlClient ?? createApolloClient();

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
  if (!gqlClient) gqlClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
export default useApollo;
