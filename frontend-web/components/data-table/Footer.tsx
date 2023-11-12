import * as React from "react";

import { cn } from "@/lib/utils";

function Root(
  { className, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>,
  ref: React.Ref<HTMLTableSectionElement>,
) {
  return (
    <tfoot
      ref={ref}
      className={cn(
        "border-t bg-base-200 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...rest}
    />
  );
}

const TableFooter = React.forwardRef(Root);
export default TableFooter;
