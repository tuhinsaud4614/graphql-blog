"use client";

import * as React from "react";

import useLockBody from "@/hooks/useLockBody";

import AddToBookmark from "./AddToBookmark";
import CommentButton from "./CommentButton";
import FloatingComments from "./FloatingComments";
import LikeButton from "./LikeButton";
import MoreOptions from "./more-options";

interface Props {
  comments: number;
}

export default function Reactions({ comments }: Props) {
  const [openCommentModal, setOpenCommentModal] = React.useState(false);

  useLockBody(openCommentModal);

  return (
    <React.Fragment>
      <section className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <LikeButton className="py-2" />
          <CommentButton
            count={comments}
            className="ml-6 py-2"
            onComment={() => setOpenCommentModal(true)}
          />
        </div>
        <span className="flex items-center gap-6">
          <AddToBookmark />
          <MoreOptions />
        </span>
      </section>
      <FloatingComments
        onClose={() => setOpenCommentModal(false)}
        open={openCommentModal}
      />
    </React.Fragment>
  );
}
