import { useMediaQuery, useTooltip } from "@hooks";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { RefObject, useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsChat } from "react-icons/bs";

const className = {
  root: "sticky bottom-[4.5rem] lg:bottom-4 left-0 z-40 flex items-center justify-center",
  reactBar:
    "shadow-mine-2 bg-base-100 px-3.5 py-2 rounded-full flex items-stretch",
  like: "flex items-center",
  likeBtn: "outline-none border-none active:scale-95",
  commentBtn:
    "flex items-center outline-none border-none text-neutral/60 hover:text-neutral active:scale-95",
  divide: "inline-block w-0.5 bg-neutral/60 mx-4 rounded-sm",
};

interface Props {
  onLike?(): void;
  onLiker?(): void;
  onComment?(): void;
  likeCount: number;
  commentCount: number;
  siblingRef: RefObject<Element>;
}

export default function ReactBox({
  onComment,
  onLike,
  onLiker,
  commentCount,
  likeCount,
  siblingRef,
}: Props) {
  const [show, setShow] = useState<boolean>(true);
  const matches = useMediaQuery("(min-width: 1024px)");
  const { onHoverEnd, onHoverStart } = useTooltip();

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
    <AnimatePresence>
      {show && (
        <div className={className.root}>
          <motion.div
            className={className.reactBar}
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span
              className={className.like}
              onMouseEnter={(e) => {
                onHoverStart(e, {
                  text: "View Likes",
                  anchorOrigin: { vertical: "top", horizontal: "center" },
                  className: "px-3 py-2",
                });
              }}
              onMouseLeave={() => {
                onHoverEnd();
              }}
            >
              <button
                aria-label="Like"
                type="button"
                className={className.likeBtn}
                onClick={onLike}
              >
                {false ? (
                  <AiFillLike
                    size={24}
                    className="text-secondary hover:text-secondary-focus"
                  />
                ) : (
                  <AiOutlineLike className="hover:text-secondary" size={24} />
                )}
              </button>
              <button
                aria-label="Liker list"
                onClick={onLiker}
                className={classNames(className.commentBtn, "ml-1")}
              >
                {likeCount}
              </button>
            </span>
            <span className={className.divide} />
            <button
              aria-label="Comments"
              type="button"
              className={className.commentBtn}
              onClick={onComment}
              onMouseEnter={(e) => {
                onHoverStart(e, {
                  text: "View Comments",
                  anchorOrigin: { vertical: "top", horizontal: "center" },
                  className: "px-3 py-2",
                });
              }}
              onMouseLeave={() => {
                onHoverEnd();
              }}
            >
              <BsChat
                size={20}
                className="text-accent hover:text-accent-focus"
              />
              <span className="ml-1">{commentCount}</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
