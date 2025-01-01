"use client";

import * as React from "react";

import { useSearchParams } from "next/navigation";

import { EditorData } from "@/components/editor";
import dexieDB from "@/lib/dexie-db";

import NewPostContextProvider from "../../_context/new-post-context";
import NewPostSkeleton from "./Skeleton";

interface Props {
  children?: React.ReactNode;
}

export default function NewPostProviders({ children }: Readonly<Props>) {
  const searchParams = useSearchParams();
  const postId = searchParams?.get("postId");
  const hasPostId = !!(postId && Number.isInteger(+postId) && +postId > 0);
  const [currentPost, setCurrentPost] = React.useState<EditorData | null>(null);
  const [loading, setLoading] = React.useState(hasPostId);

  React.useEffect(() => {
    if (hasPostId) {
      void (async () => {
        try {
          const post = await dexieDB.posts.get(+postId);
          console.log(post);
          if (post) {
            setCurrentPost(post.content ? JSON.parse(post.content) : null);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [hasPostId, postId]);
  if (loading) {
    return <NewPostSkeleton />;
  }
  return (
    <NewPostContextProvider defaultData={currentPost}>
      {children}
    </NewPostContextProvider>
  );
}
