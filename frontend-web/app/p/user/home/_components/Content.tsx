"use client";

import * as React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import Tabs from "@/components/Tabs";
import { ROUTES } from "@/lib/constants";
import { queryChecking } from "@/lib/utils";

import TabFollowing from "./TabFollowing";
import TabRecommended from "./TabRecommended";

const tabs = ["followings", "recommended"];

export default function HomeContent() {
  const searchParams = useSearchParams();

  const paramsObj = React.useMemo(() => {
    const obj: { [key: string]: any } = {};
    if (searchParams) {
      searchParams.entries().forEach(([key, value]) => {
        obj[key] = value;
      });
    }
    return obj;
  }, [searchParams]);

  const [currentTab, setCurrentTab] = React.useState(
    queryChecking(paramsObj, tabs, "tab", 1),
  );
  const { replace } = useRouter();

  React.useEffect(() => {
    setCurrentTab(queryChecking(paramsObj, tabs, "tab", 1));
  }, [paramsObj]);

  const handleTab = (index: number) => {
    setCurrentTab(index);
    replace(index === 0 ? ROUTES.user.homeFollowings : ROUTES.user.home);
  };

  return (
    <Tabs tabs={tabs} onTab={handleTab} selectedTab={currentTab}>
      {currentTab === 0 ? <TabFollowing /> : <React.Fragment />}
      {currentTab === 1 ? <TabRecommended /> : <React.Fragment />}
    </Tabs>
  );
}
