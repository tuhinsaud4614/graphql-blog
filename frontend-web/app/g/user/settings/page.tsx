import { Metadata } from "next";

import SettingsList from "./_components/List";

export const metadata: Metadata = {
  title: "The RAT Diary | Settings",
};

export default function SettingsPage() {
  return (
    <>
      <h1 className="selection:text-primary-foreground my-6 line-clamp-1 text-ellipsis border-b pb-2 font-title text-xl font-bold text-neutral selection:bg-primary dark:border-base-300 md:text-[2.625rem] md:leading-[3.25rem]">
        About you
      </h1>
      <SettingsList />
    </>
  );
}
