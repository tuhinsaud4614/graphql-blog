import { NetworkStatus } from "@apollo/client";
import classNames from "classnames";
import { Button } from "components";
import { useGetCommentRepliesOnCursorQuery } from "graphql/generated/schema";
import _ from "lodash";
import { Fragment } from "react";
import { isDev } from "utils";
import CommentItem from ".";
import CommentItemSkeleton from "./ItemSkeleton";

interface Props {
  commentId: string;
}

export default function Replies({ commentId }: Props) {
  const { data, networkStatus, fetchMore } = useGetCommentRepliesOnCursorQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: {
      commentId: commentId,
      limit: 1,
    },
  });

  if (
    networkStatus !== NetworkStatus.fetchMore &&
    networkStatus === NetworkStatus.loading
  ) {
    return <CommentItemSkeleton classes={{ root: "w-[20rem]" }} />;
  }

  if (!data || data.commentRepliesOnCursor.total === 0) {
    return (
      <p className="flex flex-col items-center justify-center text-neutral/60 dark:text-neutral-dark/60 font-extralight italic">
        There are currently no reply for this comment.
      </p>
    );
  }

  const { hasNext, endCursor } = data.commentRepliesOnCursor.pageInfo;
  const { edges } = data.commentRepliesOnCursor;

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
              commentRepliesOnCursor: {
                ...prev.commentRepliesOnCursor,
                pageInfo: {
                  ...prev.commentRepliesOnCursor.pageInfo,
                  hasNext: false,
                },
              },
            };
          }
          return {
            commentRepliesOnCursor: {
              ...fetchMoreResult.commentRepliesOnCursor,
              edges: _.uniqBy(
                [
                  ...prev.commentRepliesOnCursor.edges,
                  ...fetchMoreResult.commentRepliesOnCursor.edges,
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
      {edges.map((reply) => (
        <CommentItem
          comment={reply.node}
          key={reply.cursor}
          body={JSON.parse(reply.node.content)}
          classes={{
            root: classNames(
              "border-b last:border-none dark:border-base-dark-300",
              "max-w-[20rem]"
            ),
            replyContainer: "overflow-x-auto scrollbar-hide",
          }}
          replyCount={reply.node.replies}
        />
      ))}
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
