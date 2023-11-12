import * as React from "react";

import { cn } from "@/lib/utils";

function Root(
  { className, ...rest }: React.HTMLAttributes<HTMLTableRowElement>,
  ref: React.Ref<HTMLTableRowElement>,
) {
  return (
    <tr
      ref={ref}
      className={cn("border-b transition-colors", className)}
      {...rest}
    />
  );
}

const TableRow = React.forwardRef(Root);
export default TableRow;
