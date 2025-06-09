"use client";

import * as React from "react";

import { createContext, useContextSelector } from "use-context-selector";

import { GetPostItemFragment } from "@/graphql/generated/schema";

interface PostDetailContextType {
  post: GetPostItemFragment;
}

const PostDetailContext = createContext<PostDetailContextType | undefined>(undefined);

interface Props {
  children: React.ReactNode;
  post: GetPostItemFragment;
}

export function PostDetailProvider({ children, post }: Readonly<Props>) {
  return (
    <PostDetailContext.Provider
      value={{
        post,
      }}
    >
      {children}
    </PostDetailContext.Provider>
  );
}

export function usePostDetail<T>(
  selector: (state: PostDetailContextType) => T,
) {
  return useContextSelector(PostDetailContext, (ctx) => {
    if (!ctx) throw new Error("PostDetailContext is not available.");
    return selector(ctx);
  });
}
