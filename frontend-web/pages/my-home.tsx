import { NextPageWithLayout } from "@types";
import { Tabs } from "components";
import { UserLayout } from "components/Layout";
import {
  UserHomeFollowList,
  UserHomeTabFollowing,
  UserHomeTabRecommended,
} from "components/user-home";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, ReactElement, useState } from "react";
import { BsPlusLg } from "react-icons/bs";
import { queryChecking } from "utils";

const className = {
  top: "flex items-center text-neutral-focus my-6",
  topIcon:
    "w-9 h-9 flex items-center justify-center rounded-full bg-base-300 mr-2",
};

const tabs = ["following", "recommended"];

interface Props {
  query: { [key: string]: any };
}

const MyHome: NextPageWithLayout<Props> = ({ query }) => {
  const [currentTab, setCurrentTab] = useState(() =>
    queryChecking(query, tabs, "tab", 1)
  );
  const { replace } = useRouter();

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
          setCurrentTab(index);
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query } };
};

export default MyHome;
