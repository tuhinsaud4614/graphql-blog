import classNames from "classnames";
import { Fragment, ReactNode, useState } from "react";

import Body from "./Body";
import { EditProvider, useEditState } from "./context";
import EditComment from "./EditComment";
import Header from "./Header";
import MoreButton from "./MoreButton";
import ReplyEditor from "./ReplyEditor";

const className = {
  root: "mx-4",
  container: "py-6 pb-4 min-w-[9.375rem]",
  replyContainer: "ml-3 mb-6 border-l-[3px]",
};

type ClassesType = {
  root?: string;
  container?: string;
  header?: string;
  bodyContainer?: string;
  replyContainer?: string;
};

interface Props {
  body: string;
  classes?: ClassesType;
  children?: ReactNode;
}

export default function CommentItem({ body, children, classes }: Props) {
  const [openReplies, setReplies] = useState(false);
  const [openCommentBox, setOpenCommentBox] = useState(false);
  return (
    <section className={classNames(className.root, classes?.root)}>
      <div className={classNames(className.container, classes?.container)}>
        <EditProvider>
          <Wrapper>
            <Header className={classes?.header}>
              <MoreButton />
            </Header>
            <Body
              body={body}
              openReplies={openReplies}
              toggleReplies={() => setReplies((prev) => !prev)}
              toggleCommentBox={() => setOpenCommentBox((prev) => !prev)}
              className={classes?.bodyContainer}
            >
              {children}
            </Body>
          </Wrapper>
        </EditProvider>
      </div>
      {/* Replies start */}
      {(openReplies || openCommentBox) && (
        <section
          className={classNames(
            className.replyContainer,
            classes?.replyContainer
          )}
        >
          {openCommentBox && (
            <ReplyEditor onHide={() => setOpenCommentBox(false)} />
          )}
          {openReplies && children}
        </section>
      )}
      {/* Replies End */}
    </section>
  );
}

interface WrapperProps {
  children?: ReactNode;
}

function Wrapper({ children }: WrapperProps) {
  const open = useEditState();
  if (open) {
    return <EditComment />;
  }

  return <Fragment>{children}</Fragment>;
}
