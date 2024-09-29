import * as React from "react";

import { cn } from "@/lib/utils";

function Root(
  { className, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>,
  ref: React.Ref<HTMLTableSectionElement>,
) {
  return (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...rest}
    />
  );
}

const TableBody = React.forwardRef(Root);
export default TableBody;
