

import { Metadata } from "next";

import * as React from "react";
import OldPost from "./_components/OldPost";

export const metadata: Metadata = {
  title: "Edit Post | The RAT Diary",
};

interface Props {
  params: Promise<{ id: string }>;
  // user: User;
}

export default function NewPostPage({ params }: Readonly<Props>) {
  const {id} = React.use(params)

  return (
    <div className="p-4 md:p-6">
      <OldPost id={id} />
    </div>
  );
}
