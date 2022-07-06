import { UserBottomTab, UserHeader } from "@component";
import { NextPageWithLayout } from "@types";
import { Fragment, ReactElement } from "react";

const MyHome: NextPageWithLayout = () => {
  return <Fragment></Fragment>;
};

MyHome.getLayout = (page: ReactElement) => {
  return (
    <Fragment>
      <UserHeader />
      {page}
      <UserBottomTab />
    </Fragment>
  );
};

export default MyHome;
