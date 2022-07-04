import { NextPage } from "next";
import Link from "next/link";

const className = {
  root: "bg-base-100",
};

const Posts: NextPage = () => {
  return (
    <div className={className.root}>
      <Link href="/">
        <a>Home</a>
      </Link>
    </div>
  );
};

export default Posts;
