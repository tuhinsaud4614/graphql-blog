import * as React from "react";

import { useRouter } from "next/router";

import { NetworkStatus } from "@apollo/client";
import { AnimatePresence } from "framer-motion";
import _ from "lodash";
import { Waypoint } from "react-waypoint";

import { ModalHeader } from "@/components";
import { useGetPostCommentsOnCursorQuery } from "@/graphql/generated/schema";
import { isDev } from "@/utils";

import CommentEditor from "../CommentEditor";
import CommentItem from "../CommentItem";
import CommentItemSkeleton from "../CommentItem/ItemSkeleton";

const className = {
  bottomHeader: "border-none text-neutral dark:text-neutral-dark",
  bottomBody: "pb-6 pt-2",
  noComment:
    "my-12 flex flex-col items-center justify-center text-neutral/60 dark:text-neutral-dark/60 font-extralight italic",
};

export default function Fetcher({ onClose }: { onClose(): void }) {
  const {
    query: { postId },
  } = useRouter();

  const { data, networkStatus, loading, fetchMore } =
    useGetPostCommentsOnCursorQuery({
      notifyOnNetworkStatusChange: true,
      variables: { postId: postId as string, limit: 6 },
    });

  let component = undefined;

  if (loading && networkStatus !== NetworkStatus.fetchMore) {
    component = <CommentItemSkeleton />;
  }

  if (!loading && (!data || data.postCommentsOnCursor.total === 0)) {
    component = (
      <div className={className.noComment}>
        <p>There are currently no responses for this story.</p>
        <p>Be the first to respond.</p>
      </div>
    );
  }

  const fetchMoreHandler = async (endCursor?: string | null) => {
    try {
      await fetchMore({
        variables: {
          after: endCursor,
        },
        updateQuery(prev, { fetchMoreResult }) {
          if (!fetchMoreResult) {
            return prev;
          }
          return {
            postCommentsOnCursor: {
              ...fetchMoreResult.postCommentsOnCursor,
              edges: _.uniqBy(
                [
                  ...prev.postCommentsOnCursor.edges,
                  ...fetchMoreResult.postCommentsOnCursor.edges,
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

  if (data) {
    const { hasNext, endCursor } = data.postCommentsOnCursor.pageInfo;
    const { edges } = data.postCommentsOnCursor;

    component = (
      <React.Fragment>
        <CommentEditor />
        <AnimatePresence initial={false}>
          {edges.map((comment) => (
            <CommentItem
              comment={comment.node}
              key={comment.cursor}
              body={JSON.parse(comment.node.content)}
              classes={{
                root: "w-[inherit] mx-4",
                replyContainer: "overflow-x-auto scrollbar-hide",
              }}
              replyCount={comment.node.replies}
            />
          ))}
        </AnimatePresence>
        {hasNext && <Waypoint onEnter={() => fetchMoreHandler(endCursor)} />}
        {networkStatus === NetworkStatus.fetchMore && (
          <CommentItemSkeleton classes={{ root: "py-4" }} />
        )}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <ModalHeader onClose={onClose} className={className.bottomHeader}>
        Responses
        {!!data?.postCommentsOnCursor.total &&
          `  (${data.postCommentsOnCursor.total})`}
      </ModalHeader>
      <div className={className.bottomBody}>{component}</div>
    </React.Fragment>
  );
}
