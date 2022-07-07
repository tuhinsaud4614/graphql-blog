import { NextPageWithLayout } from "@types";
import { UserLayout } from "components/Layout";
import { Fragment, ReactElement } from "react";

const MyPosts: NextPageWithLayout = () => {
  return <Fragment></Fragment>;
};

MyPosts.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>;
};
export default MyPosts;
