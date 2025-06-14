"use client";

import * as React from "react";

import { useParams } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

import {
  useReactDispatch,
  useReactState,
} from "@/app/p/(post)/_context/react-count-context";
import {
  EReactionsMutationStatus,
  useReactToPostMutation,
} from "@/graphql/generated/schema";
import useTooltip from "@/hooks/useTooltip";
import useUser from "@/hooks/useUser";
import { isDev } from "@/lib/isType";
import { cn, countConvert } from "@/lib/utils";

import { usePostDetail } from "../../../_context/post-detail-context";
import FloatingLikes from "./FloatingLikes";

const className = {
  like: "flex items-center",
  likeBtn:
    "outline-none border-none text-neutral dark:text-neutral-dark active:scale-95",
  textBtn:
    "flex items-center outline-none border-none text-neutral/60 dark:text-neutral-dark/60 hover:text-neutral dark:hover:text-neutral-dark active:scale-95",
};

interface Props {
  className?: string;
}

const iconVariants = {
  hidden: {
    scale: 0,
    opacity: 0,
    rotate: 0,
  },
  visible: {
    scale: [0, 1.2, 1],
    opacity: 1,
    rotate: [-10, 0],
    transition: {
      duration: 0.5,
      times: [0, 0.5, 1],
    },
  },
};

export default function LikeButton({ className: cls }: Props) {
  const params = useParams<{ id: string }>();
  const [openLikeModal, setOpenLikeBox] = React.useState(false);
  const id = React.useId();
  const { count, isReacted } = useReactState((state) => state);
  const { onHoverEnd, onHoverStart } = useTooltip();

  const reactDispatch = useReactDispatch();
  const postId = params?.id;

  const author = usePostDetail((state) => state.post.author);
  const authUser = useUser();

  const [reactAction] = useReactToPostMutation({
    notifyOnNetworkStatusChange: true,
    update(cache) {
      cache.evict({ id: postId, fieldName: "postReactedBy" });
      cache.gc();
    },
  });

  const likeHandler = async () => {
    if (!authUser || authUser.id === author.id) {
      toast.warning("You can't liked your own post", {
        position: "top-center",
      });
      return;
    }
    // Store previous state for rollback
    const prevState = { count, isReacted };
    const nextReacted = !isReacted;
    try {
      // Optimistically update UI
      reactDispatch({
        type: "setToggleReact",
        payload: nextReacted,
      });
      const { data } = await reactAction({
        variables: { toId: postId as string },
      });
      if (data?.reactionToPost) {
        // Confirm with server response
        const confirmedReacted =
          data.reactionToPost === EReactionsMutationStatus.React;
        if (confirmedReacted !== nextReacted) {
          // If server disagrees, update to server state
          reactDispatch({
            type: "setToggleReact",
            payload: confirmedReacted,
          });
        }
      }
    } catch (error) {
      // Rollback on error
      reactDispatch({
        type: "setReactCount",
        payload: prevState,
      });
      isDev() && console.log(error);
    }
  };

  return (
    <>
      <span
        className={cn(cls, className.like)}
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
        <div className="flex items-center justify-center">
          <label className="relative flex size-5 cursor-pointer select-none items-center justify-center fill-secondary text-xl">
            <input
              type="checkbox"
              checked={isReacted}
              onChange={likeHandler}
              className="absolute size-0 cursor-pointer opacity-0"
              id={id}
            />

            <AnimatePresence mode="wait">
              {!isReacted ? (
                <motion.svg
                  key="regular"
                  viewBox="0 0 512 512"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute"
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <path d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.1s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16H286.5c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8H384c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32V448c0 17.7 14.3 32 32 32H96c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32H32z" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="solid"
                  viewBox="0 0 512 512"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute"
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
                </motion.svg>
              )}
            </AnimatePresence>
          </label>
        </div>

        <button
          aria-label="Reactor list"
          onClick={() => setOpenLikeBox(true)}
          className={cn(className.textBtn, "ml-1")}
        >
          {countConvert(count)}
        </button>
      </span>
      {openLikeModal && (
        <FloatingLikes
          onClose={() => setOpenLikeBox(false)}
          open={openLikeModal}
        />
      )}
    </>
  );
}
