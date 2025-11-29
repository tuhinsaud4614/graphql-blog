import Head from "next/head";

import moment from "moment";

import { ErrorBox } from "@/components";
import EditorRenderer from "@/components/editor/EditorRenderer";
import { getPostByIdQuery } from "@/lib/cached-api";
import { getUserName, gplErrorHandler } from "@/lib/utils";

import { PostDetailProvider } from "../../_context/post-detail-context";
import { ReactProvider } from "../../_context/react-count-context";
import NotFoundPost from "../_components/NotFoundPost";
import { PostDetailAuthorInfo } from "./_components";
import PostArticle from "./_components/Article";
import PostDetailLoading from "./loading";

type Params = Promise<{ id: string }>;

interface Props {
  params: Params;
}

export async function generateMetadata({ params }: { params: Params }) {
  const paramsData = await params;
  const post = await getPostByIdQuery(paramsData.id);

  if (!post?.data?.post) {
    return {
      title: "Post not found",
      description: "Post not found",
    };
  }

  const { author, ...rest } = post.data.post;
  const username = getUserName(author);

  return {
    title: `${rest.title} | by ${username} | The RAT Diary`,
    description: post.data.post.title,
  };
}

export default async function PostDetailPage({ params }: Readonly<Props>) {
  const paramsData = await params;

  const { data, error, loading } = await getPostByIdQuery(paramsData.id);

  if (loading) {
    return <PostDetailLoading />;
  }

  if (error) {
    return (
      <ErrorBox
        title="Post not found with id"
        errors={gplErrorHandler(error)}
        classes={{ root: "mt-6" }}
      />
    );
  }

  if (!data?.post) {
    return <NotFoundPost />;
  }

  const { author, ...rest } = data.post;
  const username = getUserName(author);

  return (
    <>
      <Head>
        <title>{`${rest.title} | by ${username} | The RAT Diary`}</title>
      </Head>
      <ReactProvider>
        <PostDetailProvider post={data.post}>
          <PostArticle>
            <h1 className="dark:text-neutral-dark mb-5 font-post-title text-[2.625rem] font-bold text-neutral">
              {rest.title}
            </h1>
            <PostDetailAuthorInfo
              author={author}
              postDate={moment(+rest.updatedAt).startOf("second").fromNow()}
            />
            {!!rest.content && <EditorRenderer data={rest.content} />}
          </PostArticle>
        </PostDetailProvider>
      </ReactProvider>
    </>
  );
}
