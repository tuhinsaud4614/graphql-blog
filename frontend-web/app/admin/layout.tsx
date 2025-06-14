import * as React from "react";

import { ClientOnly } from "@/components";

import AdminLayoutContainer from "./_components/Container";
import AdminLayoutHeader from "./_components/header";
import AdminLayoutSidebar from "./_components/sidebar";
import AdminDrawerControllerProvider from "./_context-hooks/adminDrawerControllerContext";

interface Props {
  children?: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <AdminDrawerControllerProvider>
      <ClientOnly>
        <AdminLayoutSidebar />
      </ClientOnly>
      <AdminLayoutContainer>
        <AdminLayoutHeader />
        <main className="max-w-screen-lg p-4 duration-300 md:p-6 lg:mx-auto">
          {children}
        </main>
      </AdminLayoutContainer>
    </AdminDrawerControllerProvider>
  );
}
