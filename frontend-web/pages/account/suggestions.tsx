import { FollowItem, Tabs } from "@component";
import { LayoutContainer } from "components/Layout";
import { SidebarContent } from "components/Sidebar";
import {
  SuggestionsFollowingTab,
  SuggestionsReadingHistoryTab,
  SuggestionsTab,
} from "components/suggestions";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { queryChecking } from "utils";
import { ROUTES } from "utils/constants";

const className = {
  title:
    "mt-6 text-neutral dark:text-neutral-dark font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
  subtitle: "text-neutral/60 dark:text-neutral-dark/60 text-sm mt-4 mb-12",
};

const tabs = ["following", "reading history", "suggestions"];

interface Props {
  query: { [key: string]: any };
}

const MySuggestionsPage: NextPage<Props> = ({ query }) => {
  const [currentTab, setCurrentTab] = useState(() =>
    queryChecking(query, tabs, "tab", 2)
  );

  const { replace } = useRouter();

  useEffect(() => {
    setCurrentTab(queryChecking(query, tabs, "tab", 2));
  }, [query]);

  return (
    <LayoutContainer
      sidebar={
        <Fragment>
          {currentTab !== 2 && (
            <SidebarContent
              moreLink={ROUTES.mySuggestions}
              moreText="See more suggestions"
              title="Who to follow"
              classes={{ items: "pb-8" }}
            >
              <FollowItem />
              <FollowItem />
              <FollowItem />
              <FollowItem />
            </SidebarContent>
          )}
        </Fragment>
      }
    >
      <Head>
        <title>The RAT Diary | Your recommendations</title>
      </Head>
      <h1 className={className.title}>Refine recommendations</h1>
      <p className={className.subtitle}>
        Adjust recommendations by updating what you’re following, your reading
        history, and who you’ve muted.
      </p>
      <Tabs
        tabs={tabs}
        onTab={(index, key) => {
          replace(
            index === 2
              ? ROUTES.mySuggestions
              : `${ROUTES.mySuggestions}?tab=${encodeURI(key)}`
          );
        }}
        selectedTab={currentTab}
      >
        {currentTab === 0 ? <SuggestionsFollowingTab /> : <Fragment />}
        {currentTab === 1 ? <SuggestionsReadingHistoryTab /> : <Fragment />}
        {currentTab === 2 ? <SuggestionsTab /> : <Fragment />}
      </Tabs>
    </LayoutContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query } };
};

export default MySuggestionsPage;
