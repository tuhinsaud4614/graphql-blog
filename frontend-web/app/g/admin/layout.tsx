import * as React from "react";

import dynamic from "next/dynamic";

import AdminDrawerControllerProvider from "@/app/g/admin/_context-hooks/adminDrawerControllerContext";

import AdminLayoutContainer from "./_components/Container";
import AdminLayoutHeader from "./_components/header";

const AdminLayoutSidebar = dynamic(() => import("./_components/sidebar"), {
  ssr: false,
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
