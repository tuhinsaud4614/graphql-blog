"use client";

import Editor from "@/components/editor";

export default function PostForm() {
  return (
    <Editor
      placeholder="What's on your mind?"
      className="post-editor font-body [--title-placeholder:'Title']"
      onValueChange={(value) => console.log(JSON.stringify(value))}
    />
  );
}
