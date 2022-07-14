import { ReactBox } from "@component";
import { LayoutContainer } from "components/Layout";
import {
  SidebarContent,
  SidebarPostItem,
  SidebarUserProfiler,
} from "components/Sidebar";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Fragment } from "react";

const className = {
  root: "bg-base-100",
};

interface IParams extends ParsedUrlQuery {
  postId: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { postId } = context.params as IParams;

  return { props: { postId }, revalidate: 10 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { postId: "1" } }, { params: { postId: "1" } }],
    fallback: false,
  };
};

const PostPage: NextPage<IParams> = ({ postId }) => {
  console.log(postId);

  return (
    <LayoutContainer
      sidebar={
        <Fragment>
          <SidebarUserProfiler classes={{ root: "mb-10" }} />
          <SidebarContent
            title="More from The RAT Diary"
            classes={{ items: "space-y-4 pb-8" }}
          >
            <SidebarPostItem />
            <SidebarPostItem />
            <SidebarPostItem />
            <SidebarPostItem />
          </SidebarContent>
        </Fragment>
      }
    >
      {postId}
      <ReactBox />
    </LayoutContainer>
  );
};

export default PostPage;
