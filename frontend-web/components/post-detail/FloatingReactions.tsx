import { useLockBody, useMediaQuery } from "@hooks";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, RefObject, useEffect, useState } from "react";
import CommentButton from "./CommentButton";
import FloatingComments from "./FloatingComments";
import FloatingLikes from "./FloatingLikes";
import LikeButton from "./LikeButton";

const className = {
  container:
    "fixed left-0 right-0 bottom-[4.5rem] lg:left-20 lg:right-[17.5rem] lg:bottom-4 xl:left-[calc((100vw-94rem)/2+5rem)] xl:right-[calc((100vw-94rem)/2+24rem)] z-40",
  root: "mx-auto w-full max-w-[94rem] p-0 flex items-center justify-center",
  reactBar:
    "shadow-mui bg-base-100 dark:bg-base-dark-200 px-3.5 py-2 rounded-full flex items-stretch",
  divide:
    "inline-block w-0.5 bg-neutral/60 dark:bg-neutral-dark/60 mx-4 rounded-sm",
};

interface Props {
  siblingRef: RefObject<Element>;
  comments: number;
}

export default function FloatingReactions({ comments, siblingRef }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const [openLikeModal, setOpenLikeBox] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const matches = useMediaQuery("(min-width: 1024px)");

  useLockBody(openLikeModal || openCommentModal);

  useEffect(() => {
    const sibling = siblingRef.current;

    if (typeof window === "undefined") return;
    if (!sibling) return;

    const { height } = sibling.getBoundingClientRect();

    if (height <= window.innerHeight - (matches ? 32 : 144)) {
      return;
    }

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
          <div className={className.container}>
            <div className={className.root}>
              <motion.div
                className={className.reactBar}
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <LikeButton />
                <span className={className.divide} />
                <CommentButton
                  count={comments}
                  onComment={() => setOpenCommentModal(true)}
                />
              </motion.div>
            </div>
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
