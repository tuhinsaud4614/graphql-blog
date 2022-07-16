import { useMediaQuery, useTooltip } from "@hooks";
import { motion } from "framer-motion";
import { Fragment, RefObject, useEffect, useRef, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { BsChat } from "react-icons/bs";

const className = {
  root: "sticky bottom-[4.5rem] lg:bottom-4 left-0 z-40 flex items-center justify-center",
  reactBar:
    "shadow-mine-2 bg-base-100 px-3.5 py-2 rounded-full flex items-stretch",
  reactBtn:
    "flex items-center outline-none border-none text-neutral/60 hover:text-neutral active:scale-95",
  divide: "inline-block w-0.5 bg-neutral/60 mx-4 rounded-sm",
};

interface Props {
  onLike?(): void;
  onComment?(): void;
  siblingRef: RefObject<Element>;
}

export default function ReactBox({ onComment, onLike, siblingRef }: Props) {
  const [show, setShow] = useState<boolean>(true);
  const likeEle = useRef<HTMLButtonElement | null>(null);
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

  if (!show) {
    return null;
  }

  return (
    <Fragment>
      <div className={className.root}>
        <motion.div
          className={className.reactBar}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <button
            aria-label="Like"
            type="button"
            className={className.reactBtn}
            onClick={onLike}
            onMouseEnter={(e) => {
              onHoverStart(e, {
                text: "View Likes",
                anchorOrigin: { vertical: "bottom", horizontal: "center" },
              });
            }}
            onMouseLeave={() => {
              onHoverEnd();
            }}
          >
            {false ? (
              <AiFillLike
                size={24}
                className="text-secondary hover:text-secondary-focus"
              />
            ) : (
              <AiOutlineLike className="hover:text-secondary" size={24} />
            )}
            <span className="ml-1">100</span>
          </button>
          <span className={className.divide} />
          <button
            aria-label="Like"
            type="button"
            className={className.reactBtn}
            onClick={onComment}
          >
            <BsChat size={20} className="text-accent hover:text-accent-focus" />
            <span className="ml-1">100</span>
          </button>
        </motion.div>
      </div>
    </Fragment>
  );
}
