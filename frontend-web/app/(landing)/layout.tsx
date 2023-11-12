import * as React from "react";

import LandingHeader from "./_components/Header";

interface Props {
  children: React.ReactNode;
}

export default function LandingLayout({ children }: Props) {
  return (
    <>
      <LandingHeader />
      <main className="bg-base-100">{children}</main>
    </>
  );
}
