import * as React from "react";

import Header from "./Header";

interface Props {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className="bg-base-100">{children}</main>
    </>
  );
}
