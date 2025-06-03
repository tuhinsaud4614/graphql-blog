import * as React from "react";

import dynamic from "next/dynamic";

import Wrapper from "./Wrapper";
import Header from "./header";

const Sidebar = dynamic(
  () => import(/* webpackChunkName: "Sidebar" */ "./Sidebar"),
  { ssr: false },
);

interface Props {
  children?: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <>
      <Sidebar />
      <Wrapper>
        <Header />
        <main className="max-w-screen-lg p-4 duration-300 md:p-6 lg:mx-auto">
          {children}
        </main>
      </Wrapper>
    </>
  );
}
