import * as React from "react";

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";

import moment from "moment";

import { AuthComponentGuard, ClientOnly, SlateViewer } from "@/components";
import { LayoutContainer } from "@/components/Layout";
import { SidebarUserProfiler } from "@/components/Sidebar";
import {
  PostDetailAuthorInfo,
  PostDetailBottomReactions,
  PostDetailImage,
  PostDetailSuggestPosts,
} from "@/components/post-detail";
import {
  GetPostByIdDocument,
  GetPostByIdQuery,
  GetPostByIdQueryVariables,
  GetPostItemFragment,
  GetPostsWithOffsetDocument,
  GetPostsWithOffsetQuery,
  GetPostsWithOffsetQueryVariables,
} from "@/graphql/generated/schema";
import { initializeApollo } from "@/lib/apollo";
import { getUserName } from "@/utils";

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const client = initializeApollo();
    const { data } = await client.query<
      GetPostsWithOffsetQuery,
      GetPostsWithOffsetQueryVariables
    >({
      query: GetPostsWithOffsetDocument,
      variables: { limit: 10 },
    });

    if (data?.postsOnOffset) {
      const paths = data.postsOnOffset.data.map((post) => ({
        params: { postId: post.id },
      }));
      return {
        paths,
        fallback: false,
      };
    }

    return {
      paths: [],
      fallback: false,
    };
  } catch (error) {
    console.log(error);

    return {
      paths: [],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { postId } = context.params as { postId: string };
  try {
    const client = initializeApollo();
    const { data } = await client.query<
      GetPostByIdQuery,
      GetPostByIdQueryVariables
    >({
      query: GetPostByIdDocument,
      variables: { id: postId },
    });
    return {
      props: { post: data.post },
      revalidate: 60 * 5,
      notFound: !data.post,
    };
  } catch (error) {
    return { props: { post: null }, notFound: true };
  }
};

const className = {
  title: "my-5 text-3xl font-bold text-neutral dark:text-neutral-dark",
};

interface IParams {
  post: GetPostItemFragment;
}

const PostPage: NextPage<IParams> = ({ post }) => {
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  const { author, ...rest } = post;
  const username = getUserName(author);

  return (
    <LayoutContainer
      sidebar={
        <React.Fragment>
          <SidebarUserProfiler user={author} classes={{ root: "mb-10" }} />
          <ClientOnly>
            <PostDetailSuggestPosts currentId={post.id} />
          </ClientOnly>
        </React.Fragment>
      }
    >
      <Head>
        <title>{`${rest.title} | by ${username} | The RAT Diary`}</title>
      </Head>
      <article ref={contentRef}>
        <PostDetailAuthorInfo
          author={author}
          postDate={moment(+rest.updatedAt).startOf("second").fromNow()}
        />
        <h1 className={className.title}>{rest.title}</h1>
        <PostDetailImage alt={rest.title} image={rest.image} />
        <br />
        <br />
        <SlateViewer value={JSON.parse(rest.content)} />
      </article>
      <ClientOnly>
        <AuthComponentGuard>
          <PostDetailBottomReactions siblingRef={contentRef} />
        </AuthComponentGuard>
      </ClientOnly>
    </LayoutContainer>
  );
};

export default PostPage;
