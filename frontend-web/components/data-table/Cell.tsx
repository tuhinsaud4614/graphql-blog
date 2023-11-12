import * as React from "react";

import { cn } from "@/lib/utils";

function Root(
  { className, ...rest }: React.ComponentProps<"td">,
  ref: React.Ref<HTMLTableCellElement>,
) {
  return (
    <td
      ref={ref}
      className={cn(
        "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...rest}
    />
  );
}

const TableCell = React.forwardRef(Root);
export default TableCell;
