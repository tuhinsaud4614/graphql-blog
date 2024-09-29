"use client";

import { useSession } from "next-auth/react";

import Badge from "@/components/ui/Badge";

export default function SideNavNotifyCount() {
  //   const count = useAppSelector(selectNotificationUnSeenCount);
  const count = 10;
  const { data: user } = useSession();

  return user && !!count ? (
    <Badge variant="secondary">{count >= 100 ? "99+" : count}</Badge>
  ) : null;
}
