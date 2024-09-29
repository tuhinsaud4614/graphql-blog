"use client";

import { usePathname } from "next/navigation";

import SidebarAuthors from "./Authors";
import SidebarCategories from "./Categories";
import SidebarSearch from "./Search";
import SidebarTags from "./Tags";

export default function Sidebar() {
  const ignorePaths: string[] = [];
  const pathname = usePathname();

  if (ignorePaths.includes(pathname ?? "")) {
    return null;
  }
  return (
    <aside className="relative hidden min-h-screen w-[17.5rem] border-l dark:border-base-300 lg:block xl:w-96">
      <section className="sticky inset-0 z-10 h-screen overflow-y-auto px-4">
        <SidebarSearch />
        <SidebarCategories />
        <SidebarTags />
        <SidebarAuthors />
      </section>
    </aside>
  );
}
