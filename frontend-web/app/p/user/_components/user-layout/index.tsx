import * as React from "react";

import BottomTab from "./bottom-tab";
import UserHeader from "./header";
import UserLayoutSideNav from "./side-nav";
import Sidebar from "./sidebar";

interface Props {
  children: React.ReactNode;
}

export default function UserLayout({ children }: Readonly<Props>) {
  return (
    <>
      <UserHeader />
      <section className="mx-auto flex max-w-[94rem]">
        <UserLayoutSideNav />
        <main className="mx-auto max-w-[45.25rem] flex-auto overflow-x-hidden px-4 py-[4.5rem] lg:py-4">
          {children}
        </main>
        <Sidebar />
      </section>
      <BottomTab />
    </>
  );
}
