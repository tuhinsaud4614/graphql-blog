import * as PopoverPrimitive from "@radix-ui/react-popover";

import PopoverAnchor from "./anchor";
import PopoverContent from "./content";
import PopoverTrigger from "./trigger";

export default function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

export { PopoverAnchor, PopoverContent, PopoverTrigger };
