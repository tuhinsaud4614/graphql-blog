import * as React from "react";

import PostHeader from "../../_components/Header";

export default function PostDetailLayout({
  children,
}: Readonly<React.PropsWithChildren>) {
  return (
    <>
      <PostHeader />
      <main className="mx-auto mt-16 max-w-4xl bg-base-100">{children}</main>
    </>
  );
}
