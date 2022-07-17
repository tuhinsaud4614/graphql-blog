import {
  BottomSheet,
  ModalHeader,
  ReactBox,
  ReactorModal,
  ReactorModalItem,
} from "components";
import { Fragment, RefObject, useState } from "react";
import Comment from "./Comment";
import CommentItem from "./CommentItem";

const className = {
  bottomHeader: "border-none",
  bottomBody: "pb-6 pt-2",
  noComment:
    "my-12 flex flex-col items-center justify-center text-neutral/60 font-extralight italic",
};

const body =
  "hgsxfhgashfg<strong> hdjgdgjjghd </strong><em><strong>djhggjdshgjds </strong></em><em>hgddg</em>";

const comments = [
  {
    text: body,
    reply: [
      {
        text: body,
        reply: [
          {
            text: body,
            reply: [
              {
                text: body,
                reply: [
                  {
                    text: body,
                    reply: [
                      {
                        text: body,
                        reply: [
                          {
                            text: body,
                            reply: [
                              {
                                text: body,
                                reply: [
                                  {
                                    text: body,
                                    reply: [
                                      { text: body, reply: [{ text: body }] },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    text: body,
  },
];

const re = (comments: any, cnt?: number) => {
  const count = cnt || 0;
  // @ts-ignore
  const x = comments.map((c, index) => (
    <CommentItem
      key={index}
      body={c.text}
      classes={{
        replyContainer:
          count === 0 ? "overflow-x-auto scrollbar-hide" : `w-fit`,
        bodyContainer: count > 0 ? "max-w-[20rem]" : undefined,
      }}
    >
      {"reply" in c && Array.isArray(c.reply) && re(c.reply, count + 1)}
    </CommentItem>
  ));
  return x;
};

interface Props {
  siblingRef: RefObject<Element>;
}

export default function Reactions({ siblingRef }: Props) {
  const [openLikeModal, setOpenLikeBox] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);

  return (
    <Fragment>
      <ReactBox
        siblingRef={siblingRef}
        commentCount={100}
        likeCount={100}
        onLiker={() => setOpenLikeBox(true)}
        onComment={() => setOpenCommentModal(true)}
      />
      <ReactorModal
        title={`578 likes for "Goodbye Node JS"`}
        open={openLikeModal}
        onHide={() => setOpenLikeBox(false)}
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <ReactorModalItem key={index} />
        ))}
      </ReactorModal>
      <BottomSheet
        open={openCommentModal}
        onHide={() => setOpenCommentModal(false)}
        classes={{ container: "overflow-y-auto" }}
      >
        <ModalHeader
          onClose={() => setOpenCommentModal(false)}
          className={className.bottomHeader}
        >
          Responses (9)
        </ModalHeader>
        <div className={className.bottomBody}>
          <Comment userInfo="g" />
          <CommentItem body={body} />
          {re(comments)}
        </div>
      </BottomSheet>
    </Fragment>
  );
}

function NoComment() {
  return (
    <div className={className.noComment}>
      <p>There are currently no responses for this story.</p>
      <p>Be the first to respond.</p>
    </div>
  );
}
