"use client";

import * as React from "react";

import dynamic from "next/dynamic";

import useLockBody from "@/hooks/useLockBody";

import HeartToggle from "../HeartToggle";
import CommentButton from "./CommentButton";
import FloatingComments from "./FloatingComments";
import LikeButton from "./LikeButton";

const LazyLikeButton = dynamic(() => import("./LikeButton"), {
  ssr: false,
});

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
          <HeartToggle
            className="size-5 text-secondary"
            classNames={{ celebrate: "size-10 stroke-[3]" }}
          />
        </span>
      </section>
      <FloatingComments
        onClose={() => setOpenCommentModal(false)}
        open={openCommentModal}
      />
    </React.Fragment>
  );
}
