import { ProgressBar } from "@component";
import type { AppPropsWithLayout } from "@types";
import Head from "next/head";
import Router from "next/router";
import * as React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/globals.css";

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
      {progress && <ProgressBar className="fixed z-50 top-0 left-0 right-0" />}
      <Component {...pageProps} />
    </React.Fragment>
  );
}
