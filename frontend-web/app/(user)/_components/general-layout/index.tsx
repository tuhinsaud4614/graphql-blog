import * as React from "react";

import GeneralLayoutHeader from "./Header";
import GeneralLayoutSideNav from "./SideNav";

interface Props {
  children: React.ReactNode;
}

export default function GeneralLayout({ children }: Props) {
  return (
    <>
      <GeneralLayoutHeader />
      <section className="mx-auto flex max-w-[94rem]">
        <GeneralLayoutSideNav />
        <main className="mx-auto max-w-[45.25rem] flex-auto overflow-x-hidden px-4 py-[4.5rem] lg:py-4">
          {children}
        </main>
        {/* {sidebar && <Sidebar>{sidebar}</Sidebar>} */}
      </section>
    </>
  );
}
