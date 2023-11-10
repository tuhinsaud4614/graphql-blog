"use client";

import * as React from "react";

import STYLES from "@/lib/styles";
import { cn } from "@/lib/utils";

import SidebarMobileView from "./MobileView";

interface Props {
  visible: boolean;
  matches: boolean;
  onClose?(): void;
}

export default function SidebarContainer({
  matches,
  visible,
  children,
  onClose,
}: React.PropsWithChildren<Props>) {
  if (matches) {
    return (
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-primary",
          STYLES.zIndex.sidebar,
          "group duration-200 ease-in",
          visible ? "w-[17.5rem]" : "w-[5.375rem] hover:w-[17.5rem]",
        )}
      >
        {children}
      </aside>
    );
  }

  return (
    <SidebarMobileView
      visible={visible}
      className={cn(
        "fixed left-0 top-0 h-screen bg-primary",
        STYLES.zIndex.sidebar,
        "w-[17.5rem]",
      )}
      onClose={onClose}
    >
      {children}
    </SidebarMobileView>
  );
}
