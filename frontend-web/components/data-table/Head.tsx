import * as React from "react";

import { cn } from "@/lib/utils";

function Root(
  { className, ...rest }: React.HTMLAttributes<HTMLTableCellElement>,
  ref: React.Ref<HTMLTableCellElement>,
) {
  return (
    <th
      ref={ref}
      className={cn(
        "h-10 px-2 text-left align-middle font-medium text-neutral/75 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...rest}
    />
  );
}

const TableHead = React.forwardRef(Root);
export default TableHead;
