import { useLockBody } from "@hooks";
import { Fragment, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import CommentButton from "./CommentButton";
import FloatingComments from "./FloatingComments";
import FloatingLikes from "./FloatingLikes";
import LikeButton from "./LikeButton";

const className = {
  root: "flex items-center justify-between mt-4",
  left: "flex items-center",
  right: "flex items-center",
  favBtn: "p-2 active:scale-95 hover:text-secondary-focus",
};

export default function Reactions() {
  const [openLikeModal, setOpenLikeBox] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);

  useLockBody(openLikeModal || openCommentModal);

  return (
    <Fragment>
      <section className={className.root}>
        <div className={className.left}>
          <LikeButton
            onLike={() => {
              console.log("Like Click");
            }}
            count={100}
            onLikeText={() => setOpenLikeBox(true)}
            className="py-2"
          />
          <CommentButton
            count={100}
            className="py-2 ml-6"
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
      <FloatingLikes
        onClose={() => setOpenLikeBox(false)}
        open={openLikeModal}
      />
      <FloatingComments
        onClose={() => setOpenCommentModal(false)}
        open={openCommentModal}
      />
    </Fragment>
  );
}
