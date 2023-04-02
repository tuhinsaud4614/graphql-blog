import { ApolloProvider } from "@apollo/client";
import { ClientOnly, ProgressBar, SubscriptionContainer } from "@component";
import { useDarkMode } from "@hooks";
import type { AppPropsWithLayout } from "@types";
import { useApollo } from "lib/apollo";
import Head from "next/head";
import { useRouter } from "next/router";
import * as React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nextReduxWrapper, useAppSelector } from "store";
// import { store } from "store";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { isDev, setAccessToken } from "utils";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [progress, setProgress] = React.useState(false);
  const { events } = useRouter();
  const apolloClient = useApollo(pageProps);
  const { isDarkMode, ternaryDarkMode } = useDarkMode();

  const getLayout = Component.getLayout ?? ((page) => page);

  React.useEffect(() => {
    const handleStart = () => {
      setProgress(true);
    };
    const handleComplete = () => {
      setProgress(false);
    };
    events.on("routeChangeStart", handleStart);
    events.on("routeChangeComplete", handleComplete);

    return () => {
      events.off("routeChangeStart", handleStart);
      events.off("routeChangeComplete", handleComplete);
    };
  }, [events]);

  return getLayout(
    <React.Fragment>
      <Head>
        <title>The RAT Diary</title>
        <meta
          name="title"
          content="The RAT Diary – Where good ideas find you."
        />
        <meta
          name="description"
          content="The RAT Diary is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic."
        />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </Head>
      {progress && (
        <ProgressBar className="fixed left-0 right-0 top-0 z-[999]" />
      )}
      {/* <Provider store={store}> */}
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
        <ClientOnly>
          <SubscriptionContainer />
        </ClientOnly>
      </ApolloProvider>
      <AccessToken />
      {/* </Provider> */}
      <ToastContainer
        theme={
          ternaryDarkMode === "system"
            ? isDarkMode
              ? "dark"
              : "light"
            : ternaryDarkMode
        }
        newestOnTop
      />
    </React.Fragment>,
  );
}

function AccessToken() {
  const effectRan = React.useRef(false);
  const token = useAppSelector((state) => state.auth.token);

  React.useEffect(() => {
    if (effectRan.current || !isDev()) {
      setAccessToken(token);
    }
    return () => {
      effectRan.current = true;
    };
  }, [token]);

  return null;
}

export default nextReduxWrapper.withRedux(MyApp);
// export default MyApp;
