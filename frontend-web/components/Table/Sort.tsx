import * as React from "react";

import type { SortDirection } from "@tanstack/react-table";
import { BiChevronDown } from "react-icons/bi";

import { Button } from "@/components";
import { cn } from "@/utils";

interface Props extends React.ComponentProps<typeof Button> {
  sorted: false | SortDirection;
}

export default function TSort({ children, sorted, ...rest }: Props) {
  return (
    <Button {...rest}>
      {children}
      {
        <BiChevronDown
          size={20}
          className={cn(
            "shrink-0 transition-transform duration-300",
            sorted === false && "invisible",
            sorted === "desc" && "-rotate-180",
          )}
        />
      }
    </Button>
  );
}
