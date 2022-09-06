import { selectUser } from "@features";
import { UserRole } from "graphql/generated/schema";
import { Fragment, ReactNode } from "react";
import { useAppSelector } from "store";

interface Props {
  role?: UserRole;
  children?: ReactNode;
}

export default function AuthComponentGuard({ role, children }: Props) {
  const user = useAppSelector(selectUser);

  if (!user) {
    return null;
  }

  if (role && user.role !== role) {
    return null;
  }

  return <Fragment>{children}</Fragment>;
}
