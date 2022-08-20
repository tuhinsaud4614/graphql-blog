import { Button } from "components";
import { ComponentPropsWithoutRef } from "react";

export default function ReactorItemMoreBtn(
  props: ComponentPropsWithoutRef<"button">
) {
  return (
    <li className="!mx-6 !mt-6 flex items-center justify-center">
      <Button
        {...props}
        type="button"
        aria-label="More"
        className="px-3.5 py-1 text-sm"
        variant="neutral"
        mode="outline"
      >
        More
      </Button>
    </li>
  );
}
