import * as React from "react";

import { cn } from "@/lib/utils";

function Root(
  { className, ...rest }: React.HTMLAttributes<HTMLTableElement>,
  ref: React.Ref<HTMLTableElement>,
) {
  return (
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...rest}
    />
  );
}

const Table = React.forwardRef(Root);
export default Table;
