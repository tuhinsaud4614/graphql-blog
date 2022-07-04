import { Header } from "@component";
import { NextPageWithLayout } from "@types";
import Link from "next/link";
import * as React from "react";

const className = {
  root: "bg-base-100",
};

const Home: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <Header />
      <div className={className.root}>
        <Link href="/posts">
          <a>Posts</a>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Home;
