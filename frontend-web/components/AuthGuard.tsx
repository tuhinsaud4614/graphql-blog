import * as React from "react";

import Router from "next/router";

import { selectUser } from "@/features";
import { UserRole } from "@/graphql/generated/schema";
import { useAppSelector } from "@/store";
import { ROUTES } from "@/utils/constants";

interface Props {
  role?: UserRole;
  children?: React.ReactNode;
}

export default function AuthGuard({ role, children }: Props) {
  const rdxUser = useAppSelector(selectUser);

  React.useEffect(() => {
    if (!rdxUser) {
      Router.replace(ROUTES.home);
      return;
    }

    if (role && rdxUser.role !== role) {
      Router.replace(ROUTES.home);
    }
  }, [rdxUser, role]);

  return <React.Fragment>{children}</React.Fragment>;
}
