import * as React from "react";

import { ClientOnly } from "@component";
import Sidebar from "./Sidebar";
import Wrapper from "./Wrapper";
import Header from "./header";

interface Props {
  children?: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <>
      <ClientOnly>
        <Sidebar />
      </ClientOnly>
      <Wrapper>
        <Header />
        <main className="max-w-screen-lg bg-base-100 px-4 duration-300 dark:bg-base-dark-100 md:px-6 lg:mx-auto">
          {children}
        </main>
      </Wrapper>
    </>
  );
}
