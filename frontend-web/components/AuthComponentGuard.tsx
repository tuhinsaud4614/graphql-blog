import * as React from "react";

import { selectUser } from "@/features";
import { UserRole } from "@/graphql/generated/schema";
import { useAppSelector } from "@/store";

interface Props {
  role?: UserRole;
  children?: React.ReactNode;
}

export default function AuthComponentGuard({ role, children }: Props) {
  const user = useAppSelector(selectUser);

  if (!user) {
    return null;
  }

  if (role && user.role !== role) {
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
