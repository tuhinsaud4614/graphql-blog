import { ReactBox, ReactorModal, ReactorModalItem } from "@component";
import { LayoutContainer } from "components/Layout";
import { PostDetailAuthorInfo } from "components/post-detail";
import {
  SidebarContent,
  SidebarPostItem,
  SidebarUserProfiler,
} from "components/Sidebar";
import { AnimatePresence } from "framer-motion";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { Fragment, useRef, useState } from "react";

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
  const [open, setOpen] = useState(false);
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
        <div ref={contentRef}>
          <PostDetailAuthorInfo />
          <div>content-{postId}</div>
        </div>
        <AnimatePresence>
          <ReactBox
            siblingRef={contentRef}
            commentCount={100}
            likeCount={100}
            onLiker={() => setOpen(true)}
          />
        </AnimatePresence>
      </LayoutContainer>
      <ReactorModal
        title={`578 likes for "Goodbye Node JS"`}
        open={open}
        onHide={() => setOpen(false)}
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <ReactorModalItem key={index} />
        ))}
      </ReactorModal>
    </Fragment>
  );
};

export default PostPage;
