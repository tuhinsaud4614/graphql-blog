import * as React from "react";

import UserLayout from "./_components/user-layout";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedUserLayout({ children }: Props) {
  return <UserLayout>{children}</UserLayout>;
}
