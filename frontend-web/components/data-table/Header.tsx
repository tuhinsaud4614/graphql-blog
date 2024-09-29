import * as React from "react";

import { cn } from "@/lib/utils";

function Root(
  props: React.HTMLAttributes<HTMLTableSectionElement>,
  ref: React.Ref<HTMLTableSectionElement>,
) {
  return (
    <thead
      ref={ref}
      {...props}
      className={cn("[&_tr]:border-b", props.className)}
    />
  );
}

const TableHeader = React.forwardRef(Root);
export default TableHeader;
