import { NextPageWithLayout } from "@types";
import { UserLayout } from "components/Layout";
import { Fragment, ReactElement } from "react";

const className = {
  title:
    "my-6 text-neutral font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
};

const SettingsPage: NextPageWithLayout = () => {
  return (
    <Fragment>
      <h1 className={className.title}>Settings</h1>
    </Fragment>
  );
};

SettingsPage.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>;
};
export default SettingsPage;
