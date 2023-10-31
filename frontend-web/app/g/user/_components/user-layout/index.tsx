import * as React from "react";

import UserHeader from "./Header";
import UserLayoutSideNav from "./SideNav";

interface Props {
  children: React.ReactNode;
}

export default function UserLayout({ children }: Props) {
  return (
    <>
      <UserHeader />
      <section className="mx-auto flex max-w-[94rem]">
        <UserLayoutSideNav />
        <main className="mx-auto max-w-[45.25rem] flex-auto overflow-x-hidden px-4 py-[4.5rem] lg:py-4">
          {children}
        </main>
        {/* {sidebar && <Sidebar>{sidebar}</Sidebar>} */}
      </section>
    </>
  );
}
