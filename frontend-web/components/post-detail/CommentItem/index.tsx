import { selectUser } from "@features";
import classNames from "classnames";
import { FCommentFragment } from "graphql/generated/schema";
import { Fragment, ReactNode, useState } from "react";
import { Descendant } from "slate";
import { useAppSelector } from "store";

import Body from "./Body";
import { EditProvider, useEditState } from "./context";
import EditComment from "./EditComment";
import Header from "./Header";
import MoreButton from "./MoreButton";
import Replies from "./Replies";
import ReplyEditor from "./ReplyEditor";

const className = {
  root: "mx-4 border-b last:border-none dark:border-base-dark-300",
  container: "py-6 pb-4 min-w-[9.375rem]",
  replyContainer: "ml-3 mb-6 border-l-[3px] dark:border-base-dark-300",
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
  // children?: ReactNode;
}

export default function CommentItem({
  comment,
  body,
  classes,
  replyCount,
}: Props) {
  const rdxUser = useAppSelector(selectUser);
  const [showReplies, setShowReplies] = useState(false);
  const [openReplyEditor, setOpenReplyEditor] = useState(false);

  return (
    <section className={classNames(className.root, classes?.root)}>
      <div className={classNames(className.container, classes?.container)}>
        <EditProvider>
          <Wrapper oldCommentContent={JSON.parse(comment.content)}>
            <Header
              user={comment.commenter}
              modifyAt={+comment.updatedAt}
              className={classes?.header}
            >
              {rdxUser?.id === comment.commenter.id && <MoreButton />}
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
            classes?.replyContainer
          )}
        >
          {openReplyEditor && (
            <ReplyEditor
              parentId={comment.id}
              onHide={() => setOpenReplyEditor(false)}
            />
          )}
          {showReplies && replyCount > 0 && <Replies commentId={comment.id} />}
        </section>
      )}
      {/* Replies End */}
    </section>
  );
}

interface WrapperProps {
  children?: ReactNode;
  oldCommentContent: Descendant[];
}

function Wrapper({ children, oldCommentContent }: WrapperProps) {
  const open = useEditState();
  if (open) {
    return <EditComment oldValue={oldCommentContent} />;
  }

  return <Fragment>{children}</Fragment>;
}
