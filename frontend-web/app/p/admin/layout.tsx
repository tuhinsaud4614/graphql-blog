import * as React from "react";

import dynamic from "next/dynamic";

import AdminDrawerControllerProvider from "@/app/p/admin/_context-hooks/adminDrawerControllerContext";
import STYLES from "@/lib/styles";
import { cn } from "@/lib/utils";

import AdminLayoutContainer from "./_components/Container";
import AdminLayoutHeader from "./_components/header";

const AdminLayoutSidebar = dynamic(() => import("./_components/sidebar"), {
  ssr: false,
  loading() {
    return (
      <div
        className={cn(
          "fixed left-0 top-0 hidden h-screen w-[5.375rem] bg-primary dark:bg-base-200 lg1:block",
          STYLES.zIndex.sidebar,
        )}
      />
    );
  },
});

interface Props {
  children?: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <AdminDrawerControllerProvider>
      <AdminLayoutSidebar />
      <AdminLayoutContainer>
        <AdminLayoutHeader />
        <main className="max-w-screen-lg p-4 duration-300 md:p-6 lg:mx-auto">
          {children}
        </main>
      </AdminLayoutContainer>
    </AdminDrawerControllerProvider>
  );
}
