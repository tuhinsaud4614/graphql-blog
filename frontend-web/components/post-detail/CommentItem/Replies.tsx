import * as React from "react";

import { useRouter } from "next/router";

import { NetworkStatus } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import _uniqBy from "lodash/uniqBy";

import { Button } from "@/components";
import { useGetPostCommentsWithCursorQuery } from "@/graphql/generated/schema";
import { isDev } from "@/utils";

import CommentItem from ".";
import CommentItemSkeleton from "./ItemSkeleton";

interface Props {
  commentId: string;
}

export default function Replies({ commentId }: Props) {
  const {
    query: { postId },
  } = useRouter();
  const { data, networkStatus, fetchMore } = useGetPostCommentsWithCursorQuery({
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

  if (!data || data.postCommentsWithCursor.total === 0) {
    return (
      <p className="flex flex-col items-center justify-center font-extralight italic text-neutral/60 dark:text-neutral-dark/60">
        There are currently no reply for this comment.
      </p>
    );
  }

  const { hasNext, endCursor } = data.postCommentsWithCursor.pageInfo;
  const { edges } = data.postCommentsWithCursor;

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
              postCommentsWithCursor: {
                ...prev.postCommentsWithCursor,
                pageInfo: {
                  ...prev.postCommentsWithCursor.pageInfo,
                  hasNext: false,
                },
              },
            };
          }
          return {
            postCommentsWithCursor: {
              ...fetchMoreResult.postCommentsWithCursor,
              edges: _uniqBy(
                [
                  ...prev.postCommentsWithCursor.edges,
                  ...fetchMoreResult.postCommentsWithCursor.edges,
                ],
                "cursor",
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
    <React.Fragment>
      <AnimatePresence>
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
    </React.Fragment>
  );
}
