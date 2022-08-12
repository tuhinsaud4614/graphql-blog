import { selectUser } from "@features";
import { UserRole } from "graphql/generated/schema";
import Router from "next/router";
import { Fragment, ReactNode, useEffect } from "react";
import { useAppSelector } from "store";
import { ROUTES } from "utils/constants";

interface Props {
  role?: UserRole;
  children?: ReactNode;
}

export default function AuthGuard({ role, children }: Props) {
  const rdxUser = useAppSelector(selectUser);

  useEffect(() => {
    if (!rdxUser) {
      Router.replace(ROUTES.home);
      return;
    }

    if (role && rdxUser.role !== role) {
      Router.replace(ROUTES.home);
    }
  }, [rdxUser, role]);

  return <Fragment>{children}</Fragment>;
}
