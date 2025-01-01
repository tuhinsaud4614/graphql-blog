"use client";

import { useDebounceCallback } from "usehooks-ts";

import Editor from "@/components/editor";

import { useNewPostState } from "../../_hooks/useNewPost";

export default function PostForm() {
  const { data, setData } = useNewPostState();
  const debounced = useDebounceCallback(setData, 500);

  return (
    <Editor
      value={data}
      placeholder="What's on your mind?"
      className="post-editor font-body [--title-placeholder:'Title']"
      onValueChange={(value) => debounced(value)}
    />
  );
}
