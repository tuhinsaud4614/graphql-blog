"use client";

import * as React from "react";

import { PostDetailBottomReactions } from "@/app/p/(post)/[id]/(detail)/_components";
import BottomReactionsSkeleton from "@/app/p/(post)/[id]/(detail)/_components/BottomReactionsSkeleton";
import AuthComponentGuard from "@/components/AuthComponentGuard";

interface Props {
  children: React.ReactNode;
}

export default function PostArticle({ children }: Readonly<Props>) {
  const contentRef = React.useRef<React.ComponentRef<"article">>(null!);
  return (
    <article className="p-4" ref={contentRef}>
      {children}
      <AuthComponentGuard loader={<BottomReactionsSkeleton />}>
        <PostDetailBottomReactions siblingRef={contentRef} />
      </AuthComponentGuard>
    </article>
  );
}
