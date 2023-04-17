import * as React from "react";

import classNames from "classnames";
import { Variants, motion } from "framer-motion";
import { Descendant } from "slate";

import { selectUser } from "@/features";
import { FCommentFragment } from "@/graphql/generated/schema";
import { useAppSelector } from "@/store";

import Body from "./Body";
import EditComment from "./EditComment";
import Header from "./Header";
import MoreButton from "./MoreButton";
import Replies from "./Replies";
import ReplyEditor from "./ReplyEditor";
import { EditProvider, useEditState } from "./context";

const className = {
  root: "border-b last:border-none dark:border-base-dark-300",
  container: "py-6 pb-4 min-w-[14rem]",
  replyContainer: "ml-3 mb-6 border-l-[3px] dark:border-base-dark-300",
};

const variants: Variants = {
  show: {
    opacity: 1,
    height: "auto",
    scale: 1,
  },
  hide: {
    opacity: 0,
    height: 0,
    scale: 0.8,
  },
};

type ClassesType = {
  root?: string;
  container?: string;
  header?: string;
  bodyContainer?: string;
  replyContainer?: string;
};

interface Props {
  comment: FCommentFragment;
  replyCount: number;
  body: Descendant[];
  classes?: ClassesType;
}

export default function CommentItem({
  comment,
  body,
  classes,
  replyCount,
}: Props) {
  const rdxUser = useAppSelector(selectUser);
  const [showReplies, setShowReplies] = React.useState(false);
  const [openReplyEditor, setOpenReplyEditor] = React.useState(false);

  React.useEffect(() => {
    if (replyCount === 0) {
      setShowReplies(false);
    }
  }, [replyCount]);

  return (
    <motion.section
      variants={variants}
      initial="hide"
      animate="show"
      exit="hide"
      transition={{ opacity: { duration: 0.2 } }}
      className={classNames(className.root, classes?.root)}
    >
      <div className={classNames(className.container, classes?.container)}>
        <EditProvider>
          <Wrapper
            commentId={comment.id}
            oldCommentContent={JSON.parse(comment.content)}
          >
            <Header
              user={comment.commenter}
              modifyAt={+comment.updatedAt}
              className={classes?.header}
              own={rdxUser?.id === comment.commenter.id}
            >
              {rdxUser?.id === comment.commenter.id && (
                <MoreButton
                  commentId={comment.id}
                  replyFor={comment.parentComment?.id}
                />
              )}
            </Header>
            <Body
              replyCount={replyCount}
              body={body}
              showReplies={showReplies}
              toggleReplies={() => setShowReplies((prev) => !prev)}
              toggleReplyEditor={() => setOpenReplyEditor((prev) => !prev)}
              className={classes?.bodyContainer}
            />
          </Wrapper>
        </EditProvider>
      </div>
      {/* Replies start */}

      {(showReplies || openReplyEditor) && (
        <section
          className={classNames(
            className.replyContainer,
            classes?.replyContainer,
          )}
        >
          {openReplyEditor && (
            <ReplyEditor
              parentId={comment.id}
              onHide={() => setOpenReplyEditor(false)}
              onSuccess={() => {
                setShowReplies(true);
              }}
              replyFor={comment.parentComment?.id}
            />
          )}
          {showReplies && replyCount > 0 && <Replies commentId={comment.id} />}
        </section>
      )}
      {/* Replies End */}
    </motion.section>
  );
}

interface WrapperProps {
  children?: React.ReactNode;
  oldCommentContent: Descendant[];
  commentId: string;
}

function Wrapper({ children, oldCommentContent, commentId }: WrapperProps) {
  const open = useEditState();
  if (open) {
    return <EditComment commentId={commentId} oldValue={oldCommentContent} />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
