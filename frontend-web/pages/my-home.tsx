import { NextPageWithLayout } from "@types";
import { Tabs } from "components";
import { UserLayout } from "components/Layout";
import {
  UserHomeFollowList,
  UserHomeTabFollowing,
  UserHomeTabRecommended,
} from "components/user-home";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { BsPlusLg } from "react-icons/bs";

const className = {
  top: "flex items-center text-neutral-focus my-6",
  topIcon:
    "w-9 h-9 flex items-center justify-center rounded-full bg-base-300 mr-2",
};

const tabs = ["following", "recommended"];

const MyHome: NextPageWithLayout = () => {
  const { replace, query } = useRouter();
  const [currentTab, setCurrentTab] = useState(1);

  useEffect(() => {
    if (query && "tab" in query && query.tab === "following") {
      setCurrentTab(0);
    } else {
      setCurrentTab(1);
    }
  }, [query]);

  return (
    <Fragment>
      <Link href="/account/me/following?tab=suggestions">
        <a aria-label="Suggestions" className={className.top}>
          <span className={className.topIcon}>
            <BsPlusLg size={12} />
          </span>
          <p>Keep up with the latest in any topic</p>
        </a>
      </Link>
      <UserHomeFollowList />
      {/* <UserHomeFollowSkeleton /> */}
      <Tabs
        tabs={tabs}
        onTab={(index) => {
          replace(index === 0 ? "/my-home?tab=following" : "/my-home");
        }}
        selectedTab={currentTab}
      >
        {currentTab === 0 ? <UserHomeTabFollowing /> : <Fragment />}
        {currentTab === 1 ? <UserHomeTabRecommended /> : <Fragment />}
      </Tabs>
    </Fragment>
  );
};

MyHome.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>;
};

export default MyHome;
