import * as React from "react";

import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserRole } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { isAuthUser } from "@/lib/isType";

interface Props {
  roles?: UserRole[];
  children?: React.ReactNode;
}

export default async function RSCAuthGuard({ roles, children }: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    const { user } = session;
    const authUser = isAuthUser(user);
    if (authUser && roles && !(user.role in roles)) {
      redirect(ROUTES.home);
    }
  }

  return <>{children}</>;
}
