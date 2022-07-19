import { useLockBody, useMediaQuery } from "@hooks";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, RefObject, useEffect, useState } from "react";
import CommentButton from "./CommentButton";
import FloatingComments from "./FloatingComments";
import FloatingLikes from "./FloatingLikes";
import LikeButton from "./LikeButton";

const className = {
  root: "sticky bottom-[4.5rem] lg:bottom-4 left-0 z-40 flex items-center justify-center",
  reactBar:
    "shadow-mine-2 bg-base-100 px-3.5 py-2 rounded-full flex items-stretch",

  divide: "inline-block w-0.5 bg-neutral/60 mx-4 rounded-sm",
};

interface Props {
  siblingRef: RefObject<Element>;
}

export default function FloatingReactions({ siblingRef }: Props) {
  const [show, setShow] = useState<boolean>(true);
  const [openLikeModal, setOpenLikeBox] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const matches = useMediaQuery("(min-width: 1024px)");

  useLockBody(openLikeModal || openCommentModal);

  useEffect(() => {
    const sibling = siblingRef.current;

    if (typeof window === "undefined") return;
    if (!sibling) return;

    const { height } = sibling.getBoundingClientRect();

    if (height <= window.innerHeight - (matches ? 32 : 144)) return;

    const onScrolling = () => {
      const isShow =
        window.innerHeight + window.pageYOffset <=
        height + (matches ? 32 : 144);

      if (isShow) {
        if (!show) {
          setShow(true);
        }
      } else {
        if (show) {
          setShow(false);
        }
      }
    };

    onScrolling();
    window.addEventListener("scroll", onScrolling);
    return () => {
      window.removeEventListener("scroll", onScrolling);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, matches]);

  return (
    <Fragment>
      <AnimatePresence>
        {show && (
          <div className={className.root}>
            <motion.div
              className={className.reactBar}
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <LikeButton
                count={100}
                onLike={() => console.log("Like click")}
                onLikeText={() => setOpenLikeBox(true)}
              />

              <span className={className.divide} />
              <CommentButton
                count={100}
                onComment={() => setOpenCommentModal(true)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
