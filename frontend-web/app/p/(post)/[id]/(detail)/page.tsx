import Head from "next/head";

import Blocks from "editorjs-blocks-react-renderer";
import moment from "moment";

import { PostDetailAuthorInfo } from "@/components/post-detail";
import { ReactProvider } from "@/context/ReactCountContext";
import {
  GetPostByIdDocument,
  GetPostByIdQuery,
  GetPostByIdQueryVariables,
} from "@/graphql/generated/schema";
import { getClient } from "@/lib/apolloClient";
import { getUserName } from "@/lib/utils";

import PostArticle from "./_components/Article";
import NotFoundPost from "./_components/NotFoundPost";

const className = {
  title: "my-5 text-3xl font-bold text-neutral dark:text-neutral-dark",
};

type Params = Promise<{ id: string }>;

interface Props {
  params: Params;
}

export const revalidate = 60;

export const dynamicParams = true

export function generateStaticParams() {
  return [];
}

export default async function PostDetailPage({ params }: Readonly<Props>) {
  const paramsData = await params;

  const { data, errors } = await getClient().query<
    GetPostByIdQuery,
    GetPostByIdQueryVariables
  >({
    query: GetPostByIdDocument,
    variables: { id: paramsData.id },
    errorPolicy: "all",
  });

  if (errors || !data?.post) {
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
        <PostArticle>
          {/* {!!rest.image && (
            <PostDetailImage alt={rest.title ?? ""} image={rest.image} />
          )} */}
          <h1 className={className.title}>{rest.title}</h1>
          <PostDetailAuthorInfo
            author={author}
            postDate={moment(+rest.updatedAt).startOf("second").fromNow()}
          />
          {!!rest.content && <Blocks data={rest.content} />}
        </PostArticle>
      </ReactProvider>
    </>
  );
}
