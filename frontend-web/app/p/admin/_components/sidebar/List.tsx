"use client";

import * as React from "react";

import { ChevronDown } from "lucide-react";

import Accordion from "@/components/ui/accordion";
import AccordionDetails from "@/components/ui/accordion/Details";
import AccordionSummary from "@/components/ui/accordion/Summary";
import { cn } from "@/lib/utils";

interface Props {
  visible: boolean;
  expanded?: boolean;
  children: React.ReactNode;
  title: React.ReactNode;
}

export default function AdminSidebarList({
  expanded,
  visible,
  children,
  title,
}: Props) {
  return (
    <li className="w-auto max-w-full">
      <Accordion expanded={expanded}>
        <AccordionSummary
          className="w-full justify-between !shadow-none"
          expandIcon={(expand) => (
            <ChevronDown
              className={cn(
                "transition-transform duration-300",
                !visible && "xl:hidden xl:group-hover:block",
                expand && "-rotate-90",
              )}
              size={24}
            />
          )}
        >
          {title}
        </AccordionSummary>
        <AccordionDetails>
          <div
            className={cn(
              "mt-2 gap-2",
              !visible && "xl:hidden xl:group-hover:block",
            )}
          >
            {children}
          </div>
        </AccordionDetails>
      </Accordion>
    </li>
  );
}
