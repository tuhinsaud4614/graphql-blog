import { Header } from "@component";
import { Banner, HomeContent, Tending } from "@component/home";
import { NextPageWithLayout } from "@types";
import * as React from "react";

const className = {
  main: "bg-base-100",
};

const Home: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <main className={className.main}>
        <Banner />
        <Tending />
        <HomeContent />
      </main>
    </React.Fragment>
  );
};

export default Home;
