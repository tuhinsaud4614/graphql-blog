import { ProgressBar } from "@component";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import Router from "next/router";
import * as React from "react";
import "../styles/globals.css";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [progress, setProgress] = React.useState(false);

  const getLayout = Component.getLayout ?? ((page) => page);

  Router.events.on("routeChangeStart", () => {
    setProgress(true);
  });

  Router.events.on("routeChangeComplete", () => {
    setProgress(false);
  });

  return getLayout(
    <React.Fragment>
      <Head>
        <title>The RAT Diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {progress && <ProgressBar className="fixed top-0 left-0 right-0" />}
      <Component {...pageProps} />
    </React.Fragment>
  );
}
