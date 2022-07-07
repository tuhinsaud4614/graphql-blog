import { NextPageWithLayout } from "@types";
import { UserLayout } from "components/Layout";
import { Fragment, ReactElement } from "react";

const Notifications: NextPageWithLayout = () => {
  return <Fragment></Fragment>;
};

Notifications.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>;
};
export default Notifications;
