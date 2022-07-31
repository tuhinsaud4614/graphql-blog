import { PostItem } from "@component";
import { SearchLayout } from "components/Layout";
import {
  PostByCounter,
  PostByHeader,
  PostByItems,
  PostBySidebarCounter,
} from "components/posts-by";
import { GetServerSideProps, NextPage } from "next";
import { Fragment } from "react";

const className = {
  item: "border-b dark:border-base-dark-300 last:border-none py-5 last:pb-0",
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
        </Fragment>
      }
    >
      <PostByHeader title={query["tagName"]} />
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
