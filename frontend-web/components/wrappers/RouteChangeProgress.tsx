"use client";

import * as React from "react";

import { usePathname, useSearchParams } from "next/navigation";

import ProgressBar from "@/components/ProgressBar";

export default function RouteChangeProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = React.useState<string>(
    `${pathname}?${searchParams}`,
  );

  const current = `${pathname}?${searchParams}`;

  React.useEffect(() => {
    setProgress(current);
  }, [current]);

  if (current === progress) {
    return null;
  }

  return <ProgressBar className="fixed inset-x-0 top-0 z-[99999]" />;
}
