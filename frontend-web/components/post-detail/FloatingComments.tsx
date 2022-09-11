import { NetworkStatus } from "@apollo/client";
import { BottomSheet, ModalHeader } from "components";
import { useGetPostCommentsOnCursorQuery } from "graphql/generated/schema";
import { useRouter } from "next/router";
import { Fragment } from "react";
import CommentEditor from "./CommentEditor";
import CommentItem from "./CommentItem";
import CommentItemSkeleton from "./CommentItem/ItemSkeleton";

const className = {
  bottomHeader: "border-none text-neutral dark:text-neutral-dark",
  bottomBody: "pb-6 pt-2",
  noComment:
    "my-12 flex flex-col items-center justify-center text-neutral/60 dark:text-neutral-dark/60 font-extralight italic",
};

interface Props {
  open: boolean;
  onClose(): void;
}

export default function FloatingComments({ onClose, open }: Props) {
  return (
    <BottomSheet
      open={open}
      onHide={onClose}
      classes={{ container: "overflow-y-auto" }}
    >
      <Fetcher onClose={onClose} />
    </BottomSheet>
  );
}

function Fetcher({ onClose }: { onClose(): void }) {
  const {
    query: { postId },
  } = useRouter();

  const { data, networkStatus, loading } = useGetPostCommentsOnCursorQuery({
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

  if (data) {
    component = (
      <Fragment>
        <CommentEditor userInfo="g" />
        {data.postCommentsOnCursor.edges.map((comment) => (
          <CommentItem
            comment={comment.node}
            key={comment.cursor}
            body={JSON.parse(comment.node.content)}
            classes={{
              replyContainer: "w-fit",
            }}
            replyCount={comment.node.replies}
          />
        ))}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <ModalHeader onClose={onClose} className={className.bottomHeader}>
        Responses ({data?.postCommentsOnCursor.total ?? 0})
      </ModalHeader>
      <div className={className.bottomBody}>{component}</div>
    </Fragment>
  );
}
