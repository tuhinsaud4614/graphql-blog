import { UserLayout } from "components/Layout";
import { SettingsNameEdit } from "components/settings";
import { NextPage } from "next";

const className = {
  title:
    "border-b dark:border-base-dark-300 pb-2 my-6 text-neutral dark:text-neutral-dark font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
  items: "flex flex-col m-0 list-none",
};

const SettingsPage: NextPage = () => {
  return (
    <UserLayout>
      <h1 className={className.title}>About you</h1>
      <ul className={className.items}>
        <SettingsNameEdit />
      </ul>
    </UserLayout>
  );
};

export default SettingsPage;
