import * as React from "react";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useLockBody } from "@/hooks";

import CommentButton from "./CommentButton";
import FloatingComments from "./FloatingComments";
import LikeButton from "./LikeButton";

const className = {
  root: "flex items-center justify-between mt-4",
  left: "flex items-center",
  right: "flex items-center",
  favBtn: "p-2 active:scale-95 hover:text-secondary-focus",
};

interface Props {
  comments: number;
}

export default function Reactions({ comments }: Props) {
  const [openCommentModal, setOpenCommentModal] = React.useState(false);

  useLockBody(openCommentModal);

  return (
    <React.Fragment>
      <section className={className.root}>
        <div className={className.left}>
          <LikeButton className="py-2" />
          <CommentButton
            count={comments}
            className="ml-6 py-2"
            onComment={() => setOpenCommentModal(true)}
          />
        </div>
        <span className={className.right}>
          <button
            type="button"
            aria-label="Favorite"
            className={className.favBtn}
          >
            {true ? (
              <AiFillHeart
                size={20}
                className="text-secondary hover:text-secondary-focus"
              />
            ) : (
              <AiOutlineHeart size={20} />
            )}
          </button>
        </span>
      </section>
      <FloatingComments
        onClose={() => setOpenCommentModal(false)}
        open={openCommentModal}
      />
    </React.Fragment>
  );
}
