import { Fragment } from "react";

import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { AiFillTag } from "react-icons/ai";

import { PostItem, Tag } from "@/components";
import { SearchLayout } from "@/components/Layout";
import { SidebarContent } from "@/components/Sidebar";
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

const PostsByTagPage: NextPage<Props> = ({ query }) => {
  return (
    <SearchLayout
      sidebar={
        <Fragment>
          <PostBySidebarCounter />
          <hr className={className.divider} />
          <SidebarContent
            title="Related Tags"
            classes={{ items: className.items }}
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <Tag
                key={index}
                href={ROUTES.postsByTag("Index" + (index + 1))}
                className={className.link}
              >
                Index-{index + 1}
              </Tag>
            ))}
          </SidebarContent>
          <PostBySidebarTopAuthors />
        </Fragment>
      }
    >
      <Head>
        <title>
          The most insightful posts about ${query["tagName"]} - The RAT Diary
        </title>
      </Head>
      <PostByHeader title={query["tagName"]} icon={<AiFillTag size={21} />} />
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

export default PostsByTagPage;
