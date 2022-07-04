import type { NextPage } from "next";
import Link from "next/link";

const className = {
  root: "bg-base-100",
};

const Home: NextPage = () => {
  return (
    <div className={className.root}>
      <Link href="/posts">
        <a>Posts</a>
      </Link>
    </div>
  );
};

export default Home;
