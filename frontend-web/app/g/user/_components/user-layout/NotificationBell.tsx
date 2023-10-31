"use client";

import Link from "next/link";

import { Bell } from "lucide-react";

import Badge from "@/components/ui/Badge";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Props {
  pathname: string;
}

export default function NotificationBell({ pathname }: Props) {
  // const count = useAppSelector(selectNotificationUnSeenCount);

  const count = 10;

  return (
    <Link
      href={ROUTES.user.notifications}
      className="flex h-9 w-9 cursor-pointer select-none items-center justify-center rounded-full border border-accent text-accent hover:border-accent-focus hover:text-accent-focus active:scale-95 dark:hover:border-accent dark:hover:text-accent"
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
    </Link>
  );
}
