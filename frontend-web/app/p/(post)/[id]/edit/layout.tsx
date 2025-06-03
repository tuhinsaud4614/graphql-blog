"use client";

import dynamic from "next/dynamic";

import PostHeader from "../../_components/Header";
import NewPostProviders from "./_components/Providers";

interface Props {
  children?: React.ReactNode;
}

const HeaderContent = dynamic(() => import("./_components/HeaderContent"), {
  ssr: false,
});

export default function PostLayout({ children }: Readonly<Props>) {
  return (
    <NewPostProviders>
      <PostHeader>
        <HeaderContent />
      </PostHeader>
      <main className="mx-auto mt-16 max-w-3xl bg-base-100">{children}</main>
    </NewPostProviders>
  );
}
