"use client";

import { Bell } from "lucide-react";

import Badge from "@/components/ui/Badge";
import LinkButton from "@/components/ui/LinkButton";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  pathname: string;
}

export default function NotificationBell({ pathname }: Props) {
  // const count = useAppSelector(selectNotificationUnSeenCount);

  const count = 10;

  return (
    <LinkButton
      href={ROUTES.user.notifications}
      mode="outline"
      className="h-9 w-9"
      aria-label="Notifications"
    >
      <span className="relative">
        <Bell
          className={cn(
            pathname === ROUTES.user.notifications && "fill-current",
          )}
          size={20}
        />

        {!!count && (
          <Badge variant="secondary">{count >= 100 ? "99+" : count}</Badge>
        )}
      </span>
    </LinkButton>
  );
}
