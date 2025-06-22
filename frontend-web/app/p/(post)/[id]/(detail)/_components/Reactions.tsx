"use client";

import * as React from "react";

import { useParams } from "next/navigation";

import AddToBookmark from "@/components/post/AddToBookmark";
import useLockBody from "@/hooks/useLockBody";

import { usePostDetail } from "../../../_context/post-detail-context";
import CommentButton from "./CommentButton";
import FloatingComments from "./FloatingComments";
import LikeButton from "./LikeButton";
import MoreOptions from "./more-options";

interface Props {
  comments: number;
}

export default function Reactions({ comments }: Props) {
  const params = useParams<{ id: string }>();
  const [openCommentModal, setOpenCommentModal] = React.useState(false);

  const author = usePostDetail((state) => state.post.author);
  useLockBody(openCommentModal);
  const postId = params?.id;

  return (
    <React.Fragment>
      <section className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <LikeButton author={author} postId={postId || ""} className="py-2" />
          <CommentButton
            count={comments}
            className="ml-6 py-2"
            onComment={() => setOpenCommentModal(true)}
          />
        </div>
        <span className="flex items-center gap-6">
          <AddToBookmark author={author} postId={postId || ""} />
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
