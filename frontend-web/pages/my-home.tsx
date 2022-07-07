import { NextPageWithLayout } from "@types";
import { UserLayout } from "components/layout";
import { Fragment, ReactElement } from "react";

const MyHome: NextPageWithLayout = () => {
  return (
    <Fragment>
      <div>hello</div>
      <div>hi</div>
    </Fragment>
  );
};

MyHome.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>;
};

export default MyHome;
