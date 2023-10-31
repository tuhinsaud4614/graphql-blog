import * as React from "react";

import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

export default function Wrapper({ children }: Props) {
  return (
    <section className="flex max-w-5xl flex-col pb-4 sm:mx-auto md1:flex-row-reverse md1:pt-10">
      <Sidebar />
      {children}
    </section>
  );
}
