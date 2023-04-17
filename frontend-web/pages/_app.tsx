import * as React from "react";

import Head from "next/head";

import { ApolloProvider } from "@apollo/client";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import { store } from "store";
import { ClientOnly, ProgressBar, SubscriptionContainer } from "@/components";
import { useDarkMode } from "@/hooks";
import { useApollo } from "@/lib/apollo";
import { nextReduxWrapper, useAppSelector } from "@/store";
import { isDev, setAccessToken } from "@/utils";
import type { AppPropsWithLayout } from "@/utils/types";

import "@/styles/globals.css";

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const [progress, setProgress] = React.useState(false);
  const apolloClient = useApollo(pageProps);
  const { isDarkMode, ternaryDarkMode } = useDarkMode();
  const { events } = router;

  React.useEffect(() => {
    const handleStart = () => setProgress(true);
    const handleComplete = () => setProgress(false);
    events.on("routeChangeStart", handleStart);
    events.on("routeChangeComplete", handleComplete);

    return () => {
      events.off("routeChangeStart", handleStart);
      events.off("routeChangeComplete", handleComplete);
    };
  }, [events]);

  const getLayout = Component.getLayout ?? ((page) => page);

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
      {progress && <ProgressBar className="fixed inset-x-0 top-0 z-[99999]" />}
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
