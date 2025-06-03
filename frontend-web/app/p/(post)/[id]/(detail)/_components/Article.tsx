"use client";

import * as React from "react";

import dynamic, { DynamicOptionsLoadingProps } from "next/dynamic";

import AuthComponentGuard from "@/components/AuthComponentGuard";
import { PostDetailBottomReactions } from "@/components/post-detail";
import BottomReactionsSkeleton from "@/components/post-detail/BottomReactionsSkeleton";

function createLoadingComponent() {
  return function LoadingComponent({
    error,
    isLoading,
  }: Readonly<DynamicOptionsLoadingProps>) {
    const [, setRetryKey] = React.useState(0);

    const handleRetry = React.useCallback(() => {
      setRetryKey((prev) => prev + 1);
      // Force re-import by updating the key
      window.location.reload();
    }, []);

    return (
      <BottomReactionsSkeleton
        error={error || undefined}
        retry={error ? handleRetry : undefined}
        isLoading={isLoading}
      />
    );
  };
}

const LazyPostDetailBottomReactions = dynamic(
  () =>
    import("@/components/post-detail").then(
      (mod) => mod.PostDetailBottomReactions,
    ),
  {
    ssr: false,
    loading: createLoadingComponent(),
  },
);

interface Props {
  children: React.ReactNode;
}

export default function PostArticle({ children }: Readonly<Props>) {
  const contentRef = React.useRef<React.ComponentRef<"article">>(null!);
  return (
    <article className="p-4">
      {children}
      <AuthComponentGuard loader={<BottomReactionsSkeleton />}>
        <PostDetailBottomReactions siblingRef={contentRef} />
      </AuthComponentGuard>
    </article>
  );
}
