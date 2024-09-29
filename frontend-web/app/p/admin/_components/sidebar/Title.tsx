import * as React from "react";

import { cn } from "@/lib/utils";

export default function AdminSidebarTitle({
  visible,
  children,
}: React.PropsWithChildren<{ visible: boolean }>) {
  return (
    <span
      className={cn(
        "duration-300",
        !visible && "xl:hidden xl:group-hover:block",
      )}
    >
      {children}
    </span>
  );
}
