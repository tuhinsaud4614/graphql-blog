import { NetworkStatus } from "@apollo/client";
import { Button } from "components";
import { AnimatePresence } from "framer-motion";
import { useGetPostCommentsOnCursorQuery } from "graphql/generated/schema";
import _ from "lodash";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { isDev } from "utils";
import CommentItem from ".";
import CommentItemSkeleton from "./ItemSkeleton";

interface Props {
  commentId: string;
}

export default function Replies({ commentId }: Props) {
  const {
    query: { postId },
  } = useRouter();
  const { data, networkStatus, fetchMore } = useGetPostCommentsOnCursorQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      postId: postId as string,
      parentId: commentId,
      limit: 6,
    },
  });

  if (
    networkStatus !== NetworkStatus.fetchMore &&
    networkStatus === NetworkStatus.loading
  ) {
    return <CommentItemSkeleton classes={{ root: "w-[20rem]" }} />;
  }

  if (!data || data.postCommentsOnCursor.total === 0) {
    return (
      <p className="flex flex-col items-center justify-center text-neutral/60 dark:text-neutral-dark/60 font-extralight italic">
        There are currently no reply for this comment.
      </p>
    );
  }

  const { hasNext, endCursor } = data.postCommentsOnCursor.pageInfo;
  const { edges } = data.postCommentsOnCursor;

  const fetchMoreHandler = async () => {
    try {
      await fetchMore({
        variables: {
          after: endCursor,
        },
        updateQuery(prev, { fetchMoreResult }) {
          if (!fetchMoreResult) {
            return {
              ...prev,
              postCommentsOnCursor: {
                ...prev.postCommentsOnCursor,
                pageInfo: {
                  ...prev.postCommentsOnCursor.pageInfo,
                  hasNext: false,
                },
              },
            };
          }
          return {
            postCommentsOnCursor: {
              ...fetchMoreResult.postCommentsOnCursor,
              edges: _.uniqBy(
                [
                  ...prev.postCommentsOnCursor.edges,
                  ...fetchMoreResult.postCommentsOnCursor.edges,
                ],
                "cursor"
              ),
            },
          };
        },
      });
    } catch (error) {
      isDev() && console.log(error);
    }
  };

  return (
    <Fragment>
      <AnimatePresence initial={false}>
        {edges.map((reply) => (
          <CommentItem
            comment={reply.node}
            key={reply.cursor}
            body={JSON.parse(reply.node.content)}
            classes={{
              root: "ml-4",
            }}
            replyCount={reply.node.replies}
          />
        ))}
      </AnimatePresence>
      {networkStatus === NetworkStatus.fetchMore && (
        <CommentItemSkeleton classes={{ root: "py-6 pb-4" }} />
      )}
      {hasNext && (
        <Button mode="text" onClick={fetchMoreHandler} className="mx-4 my-2">
          Show more replies
        </Button>
      )}
    </Fragment>
  );
}
