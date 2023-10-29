"use client";

import Badge from "@/components/ui/Badge";
import { useAuthUser } from "@/hooks/useAuth";

export default function SideNavNotifyCount() {
  //   const count = useAppSelector(selectNotificationUnSeenCount);
  const count = 10;
  const user = useAuthUser();

  return user && !!count ? (
    <Badge variant="secondary">{count >= 100 ? "99+" : count}</Badge>
  ) : null;
}
