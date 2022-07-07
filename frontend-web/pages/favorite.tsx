import { NextPageWithLayout } from "@types";
import { UserLayout } from "components/Layout";
import { Fragment, ReactElement } from "react";

const Favorite: NextPageWithLayout = () => {
  return <Fragment></Fragment>;
};

Favorite.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>;
};
export default Favorite;
