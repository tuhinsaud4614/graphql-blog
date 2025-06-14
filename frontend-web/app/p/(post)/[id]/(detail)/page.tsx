import Head from "next/head";

import Blocks from "editorjs-blocks-react-renderer";
import moment from "moment";

import { ErrorBox } from "@/components";
import {
  GetPostByIdDocument,
  GetPostByIdQuery,
  GetPostByIdQueryVariables,
} from "@/graphql/generated/schema";
import { getClient } from "@/lib/apolloClient";
import { getUserName, gplErrorHandler } from "@/lib/utils";

import { PostDetailProvider } from "../../_context/post-detail-context";
import { ReactProvider } from "../../_context/react-count-context";
import { PostDetailAuthorInfo } from "./_components";
import PostArticle from "./_components/Article";
import NotFoundPost from "./_components/NotFoundPost";
import PostDetailLoading from "./loading";

const className = {
  title: "my-5 text-3xl font-bold text-neutral dark:text-neutral-dark",
};

type Params = Promise<{ id: string }>;

interface Props {
  params: Params;
}

export const revalidate = 60;

export const dynamicParams = true;

export default async function PostDetailPage({ params }: Readonly<Props>) {
  const paramsData = await params;

  const { data, error, loading } = await getClient().query<
    GetPostByIdQuery,
    GetPostByIdQueryVariables
  >({
    query: GetPostByIdDocument,
    variables: { id: paramsData.id },
    errorPolicy: "all",
  });

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
            <h1 className={className.title}>{rest.title}</h1>
            <PostDetailAuthorInfo
              author={author}
              postDate={moment(+rest.updatedAt).startOf("second").fromNow()}
            />
            {!!rest.content && (
              <Blocks
                data={rest.content}
                config={{
                  header: { className: "text-2xl font-bold my-4" },
                  paragraph: {
                    className: "text-base text-gray-800 leading-relaxed mb-3",
                  },
                  list: {
                    className: "list-inside list-disc mb-3 pl-10",
                  },
                  quote: {
                    className: "border-l-4 border-gray-300 pl-4 italic my-4",
                  },
                  image: {
                    className: "w-full rounded overflow-hidden my-4",
                    actionsClassNames: {
                      stretched: "w-full h-[400px] object-cover",
                      withBorder: "border border-gray-200",
                      withBackground: "p-2 bg-gray-100",
                    },
                  },
                  code: {
                    className:
                      "bg-gray-100 rounded p-2 font-mono text-sm overflow-auto mb-3",
                  },
                  delimiter: { className: "border-t my-6" },
                  table: { className: "table-auto border-collapse mb-4" },
                  embed: { className: "w-full h-[400px] mb-4" },
                }}
              />
            )}
          </PostArticle>
        </PostDetailProvider>
      </ReactProvider>
    </>
  );
}
