"use client";

import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";

// Import nprogress CSS
import "nprogress/nprogress.css";

export default function RouteChangeProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Configure nprogress
    NProgress.configure({
      showSpinner: false,
      trickleSpeed: 100,
      minimum: 0.08,
    });
  }, []);

  useEffect(() => {
    // Start progress on route change
    NProgress.start();

    // Complete progress after a short delay
    const timer = setTimeout(() => {
      NProgress.done();
    }, 200);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  return null;
}
