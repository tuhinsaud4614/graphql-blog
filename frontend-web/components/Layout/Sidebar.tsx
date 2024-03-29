import * as React from "react";

import { SidebarSearch } from "@/components";

const className = {
  root: "hidden lg:block min-h-screen w-[17.5rem] xl:w-96 border-l dark:border-base-dark-300 relative",
  container: "h-screen sticky inset-0 z-10 px-4 overflow-y-auto",
};

interface Props {
  children?: React.ReactNode;
}

export default function Sidebar({ children }: Props) {
  return (
    <aside className={className.root}>
      <section className={className.container}>
        <SidebarSearch />
        {children}
      </section>
    </aside>
  );
}
