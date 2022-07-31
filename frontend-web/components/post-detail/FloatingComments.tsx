import classNames from "classnames";
import { BottomSheet, ModalHeader } from "components";
import { useMemo } from "react";
import CommentEditor from "./CommentEditor";
import CommentItem from "./CommentItem";

const className = {
  bottomHeader: "border-none text-neutral dark:text-neutral-dark",
  bottomBody: "pb-6 pt-2",
  noComment:
    "my-12 flex flex-col items-center justify-center text-neutral/60 dark:text-neutral-dark/60 font-extralight italic",
};

const body = [
  {
    children: [
      { text: "Lorem ", bold: true },
      { bold: false, text: "ipsum" },
      { bold: true, text: ", " },
      { bold: true, text: "dolor", italic: true },
      { bold: true, text: " " },
      { bold: false, text: "sit amet " },
      { bold: true, text: "consectetur" },
      { bold: false, text: " adipisicing elit." },
    ],
  },
];

const comments = [
  {
    text: body,
  },
  {
    text: body,
    reply: [
      {
        text: body,
        reply: [
          {
            text: body,
          },
          {
            text: body,
          },
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

interface Props {
  open: boolean;
  onClose(): void;
}

export default function FloatingComments({ onClose, open }: Props) {
  const items = useMemo(() => {
    const result = (comments: any, cnt?: number) => {
      const count = cnt || 0;
      // @ts-ignore
      const x = comments.map((c, index) => (
        <CommentItem
          key={index}
          body={c.text}
          classes={{
            root: classNames(
              "border-b last:border-none dark:border-base-dark-300",
              count > 0 && "max-w-[20rem]"
            ),
            replyContainer:
              count === 0 ? "overflow-x-auto scrollbar-hide" : `w-fit`,
          }}
        >
          {"reply" in c && Array.isArray(c.reply) && result(c.reply, count + 1)}
        </CommentItem>
      ));
      return x;
    };

    return result(comments);
  }, []);

  return (
    <BottomSheet
      open={open}
      onHide={onClose}
      classes={{ container: "overflow-y-auto" }}
    >
      <ModalHeader onClose={onClose} className={className.bottomHeader}>
        Responses (9)
      </ModalHeader>
      <div className={className.bottomBody}>
        <CommentEditor userInfo="g" />
        {items}
      </div>
    </BottomSheet>
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
