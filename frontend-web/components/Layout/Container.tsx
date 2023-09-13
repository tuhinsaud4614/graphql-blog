import * as React from "react";

import { cn } from "@/utils";

import BottomTab from "./BottomTab";
import Header from "./Header";
import SideNav from "./SideNav";
import Sidebar from "./Sidebar";

interface Props {
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
  classes?: {
    container?: string;
    main?: string;
  };
}

const className = {
  container: "max-w-[94rem] mx-auto flex",
  main: "mx-auto max-w-[45.25rem] flex-auto px-4 py-[4.5rem] lg:py-4 overflow-x-hidden",
};

export default function Container({ sidebar, classes, children }: Props) {
  return (
    <React.Fragment>
      <Header />
      <section className={cn(className.container, classes?.container)}>
        <SideNav />
        <main className={cn(className.main, classes?.main)}>{children}</main>
        {sidebar && <Sidebar>{sidebar}</Sidebar>}
      </section>
      <BottomTab />
    </React.Fragment>
  );
}
