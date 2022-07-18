import { LayoutContainer } from "components/Layout";
import {
  PostDetailAuthorInfo,
  PostDetailImage,
  PostDetailReactions,
} from "components/post-detail";
import {
  SidebarContent,
  SidebarPostItem,
  SidebarUserProfiler,
} from "components/Sidebar";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Fragment, useRef } from "react";

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
  const contentRef = useRef<HTMLDivElement | null>(null);

  return (
    <Fragment>
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
        <article ref={contentRef}>
          <PostDetailAuthorInfo />
          <PostDetailImage />
          <div>content-{postId}</div>
        </article>
        <PostDetailReactions siblingRef={contentRef} />
      </LayoutContainer>
    </Fragment>
  );
};

export default PostPage;
