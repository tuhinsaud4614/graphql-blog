import { cn } from "@/lib/utils";

import Separator from "../../atoms/separator";

export default function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-border relative m-0! self-stretch data-[orientation=vertical]:h-auto",
        className
      )}
      {...props}
    />
  );
}
