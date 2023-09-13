import * as React from "react";

import { selectAdminSidebar } from "@/features";
import { useAppSelector } from "@/store";
import { cn } from "@/utils";

export default function Wrapper({ children }: React.PropsWithChildren) {
  const visible = useAppSelector(selectAdminSidebar);
  return (
    <div
      className={cn(
        "transition-[margin-left] duration-300 ease-in",
        visible ? "xl:ml-[17.5rem]" : "xl:ml-[5.375rem]",
      )}
    >
      {children}
    </div>
  );
}
