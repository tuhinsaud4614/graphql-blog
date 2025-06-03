"use client";

import { cn } from "@/lib/utils";
import * as React from "react";


export default function Wrapper({ children }: React.PropsWithChildren) {
  // const visible = useAppSelector(selectAdminSidebar);
  const visible = false;
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
