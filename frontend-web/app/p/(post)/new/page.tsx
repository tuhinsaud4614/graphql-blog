import { Metadata } from "next";

import PostForm from "../_components/post-form";

export const metadata: Metadata = {
  title: "New Post | The RAT Diary",
};

export default function NewPostPage() {
  return (
    <div className="p-4 md:p-6">
      <PostForm />
    </div>
  );
}
