import * as React from "react";

import { cn } from "@/lib/utils";

function Root(
  { className, ...rest }: React.HTMLAttributes<HTMLTableCaptionElement>,
  ref: React.Ref<HTMLTableCaptionElement>,
) {
  return (
    <caption
      ref={ref}
      className={cn("mt-4 text-sm text-neutral/75", className)}
      {...rest}
    />
  );
}

const TableCaption = React.forwardRef(Root);
export default TableCaption;
