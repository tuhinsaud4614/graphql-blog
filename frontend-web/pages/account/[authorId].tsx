import { Tabs } from "@component";
import {
  AuthorInfoAboutTab,
  AuthorInfoFollowingList,
  AuthorInfoHomeTab,
} from "components/authorInfo";
import { LayoutContainer } from "components/Layout";
import { SidebarUserProfiler } from "components/Sidebar";
import _ from "lodash";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { queryChecking } from "utils";
import { ROUTES } from "utils/constants";

const className = {
  title: "mb-4 mt-8 flex items-center",
  titleImg: "w-8 h-8 mr-5 overflow-hidden rounded-full md:hidden",
  titleText:
    "text-[1.375rem] leading-7 tracking-normal font-bold text-neutral line-clamp-1 text-ellipsis capitalize md:text-[2.625rem] md:leading-[3.25rem]",
};

const tabs = ["home", "about"];

function tabChecking(query: { [key: string]: any }) {
  if (_.has(query, "tab") && query.tab === "about") {
    return 1;
  }
  return 0;
}

interface Props {
  query: { [key: string]: any };
}

const AboutPage: NextPage<Props> = ({ query }) => {
  const [currentTab, setCurrentTab] = useState(() =>
    queryChecking(query, tabs, "tab")
  );
  const { replace } = useRouter();
  const { authorId } = query;

  return (
    <LayoutContainer
      sidebar={
        <Fragment>
          <SidebarUserProfiler
            own={query.authorId === "1"}
            classes={{ root: "mb-10" }}
          />
          <AuthorInfoFollowingList />
        </Fragment>
      }
    >
      <div className={className.title}>
        <span className={className.titleImg}>
          <Image
            src="/demo.png"
            alt="Avatar"
            width={32}
            height={32}
            layout="responsive"
            objectFit="cover"
          />
        </span>
        <h1 className={className.titleText}>Lorem ipsum dolor</h1>
      </div>
      <Tabs
        tabs={tabs}
        onTab={(index) => {
          setCurrentTab(index);
          replace(
            index === 0
              ? ROUTES.authorProfile(authorId)
              : ROUTES.authorProfile(authorId) + "?tab=about"
          );
        }}
        selectedTab={currentTab}
      >
        {currentTab === 0 ? <AuthorInfoHomeTab /> : <Fragment />}
        {currentTab === 1 ? <AuthorInfoAboutTab /> : <Fragment />}
      </Tabs>
    </LayoutContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query } };
};

export default AboutPage;
