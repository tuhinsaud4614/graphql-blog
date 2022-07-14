import { LinkButton, Tabs } from "@component";
import { NextPageWithLayout } from "@types";
import {
  AccountPostsTabDrafts,
  AccountPostsTabPublished,
} from "components/account";
import { UserLayout } from "components/Layout";
import { useRouter } from "next/router";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { MY_POSTS_TABS, ROUTES } from "utils/constants";

const className = {
  rootBar: "flex items-center justify-between",
  title:
    "my-6 text-neutral font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
};

const MyPostsPage: NextPageWithLayout = () => {
  const { replace, query } = useRouter();
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    if (query && "tab" in query && query.tab === "published") {
      setCurrentTab(1);
    } else {
      setCurrentTab(0);
    }
  }, [query]);

  return (
    <Fragment>
      <div className={className.rootBar}>
        <h1 className={className.title}>Your posts</h1>
        <LinkButton href={ROUTES.createPost}>Write a post</LinkButton>
      </div>
      <Tabs
        tabs={[...MY_POSTS_TABS]}
        onTab={(index, key) => {
          replace(index === 0 ? ROUTES.myPosts : ROUTES.myPostsQuery(key));
        }}
        selectedTab={currentTab}
      >
        {currentTab === 0 ? <AccountPostsTabDrafts /> : <Fragment />}
        {currentTab === 1 ? <AccountPostsTabPublished /> : <Fragment />}
      </Tabs>
    </Fragment>
  );
};

MyPostsPage.getLayout = (page: ReactElement) => {
  return <UserLayout>{page}</UserLayout>;
};
export default MyPostsPage;
