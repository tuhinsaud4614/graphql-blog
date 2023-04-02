import { LinkButton, Tabs } from "@component";
import { MY_POSTS_TABS, ROUTES } from "@constants";
import {
  AccountPostsTabDrafts,
  AccountPostsTabPublished,
} from "components/account";
import { UserLayout } from "components/Layout";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { queryChecking } from "utils";

const className = {
  rootBar: "flex items-center justify-between",
  title:
    "my-6 text-neutral dark:text-neutral-dark font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
};

interface Props {
  query: { [key: string]: any };
}

const MyPostsPage: NextPage<Props> = ({ query }) => {
  const [currentTab, setCurrentTab] = useState(() =>
    queryChecking(query, MY_POSTS_TABS, "tab", 0),
  );
  const { replace } = useRouter();

  return (
    <UserLayout>
      <Head>
        <title>The RAT Diary | Your posts</title>
      </Head>
      <div className={className.rootBar}>
        <h1 className={className.title}>Your posts</h1>
        <LinkButton href={ROUTES.createPost}>Write a post</LinkButton>
      </div>
      <Tabs
        tabs={MY_POSTS_TABS}
        onTab={(index, key) => {
          setCurrentTab(index);
          replace(index === 0 ? ROUTES.myPosts : ROUTES.myPostsQuery(key));
        }}
        selectedTab={currentTab}
      >
        {currentTab === 0 ? <AccountPostsTabDrafts /> : <Fragment />}
        {currentTab === 1 ? <AccountPostsTabPublished /> : <Fragment />}
      </Tabs>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query } };
};
export default MyPostsPage;
