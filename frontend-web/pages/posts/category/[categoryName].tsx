import * as React from "react";

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { BiCategoryAlt } from "react-icons/bi";

import { PostItem } from "@/components";
import { SearchLayout } from "@/components/Layout";
import { SidebarCategory, SidebarContent } from "@/components/Sidebar";
import {
  PostByCounter,
  PostByHeader,
  PostByItems,
  PostBySidebarCounter,
  PostBySidebarTopAuthors,
} from "@/components/posts-by";
import { ROUTES } from "@/utils/constants";

const className = {
  item: "border-b dark:border-base-dark-300 last:border-none py-5 last:pb-0",
  items: "list-none m-0 flex flex-wrap space-x-3 space-y-3 -mt-3 -ml-3",
  link: "first:mt-3 first:ml-3 !rounded-full bg-neutral/5 dark:bg-neutral-dark/5 active:scale-95",
  divider: "border-b dark:border-base-dark-300 w-full my-8",
};

interface Props {
  query: { [key: string]: any };
}

const PostsByCategoryPage: NextPage<Props> = ({ query }) => {
  return (
    <SearchLayout
      sidebar={
        <React.Fragment>
          <PostBySidebarCounter />
          <hr className={className.divider} />
          <SidebarContent
            title="Related Categories"
            // classes={{ items: className.items }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <SidebarCategory
                key={index}
                title={"New Category -" + (index + 1)}
                link={ROUTES.postsByCategory("New Category" + (index + 1))}
              />
            ))}
          </SidebarContent>
          <PostBySidebarTopAuthors />
        </React.Fragment>
      }
    >
      <Head>
        <title>
          The most insightful posts about ${query["categoryName"]} - The RAT
          Diary
        </title>
      </Head>
      <PostByHeader
        title={query["categoryName"]}
        icon={<BiCategoryAlt size={21} />}
      />
      <PostByCounter />
      <PostByItems>
        {Array.from({ length: 10 }).map((_, index) => (
          <PostItem key={index} classes={{ root: className.item }} />
        ))}
      </PostByItems>
    </SearchLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { query } };
};

export default PostsByCategoryPage;
