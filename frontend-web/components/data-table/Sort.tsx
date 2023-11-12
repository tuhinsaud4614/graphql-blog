import * as React from "react";

import type { SortDirection } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import Button from "../ui/Button";

interface Props extends React.ComponentProps<typeof Button> {
  sorted: false | SortDirection;
}

function Root(
  { children, sorted, ...rest }: Props,
  ref: React.Ref<HTMLButtonElement>,
) {
  return (
    <Button ref={ref} {...rest} className={cn("gap-1 p-0.5", rest.className)}>
      {children}
      {
        <ChevronDown
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

const DataTableSort = React.forwardRef(Root);
export default DataTableSort;
