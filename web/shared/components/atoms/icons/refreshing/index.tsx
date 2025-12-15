import * as React from "react";

import { IconVariant } from "@/lib/types";

const SvgComponent = (
  {
    variant = "normal",
    ...props
  }: React.SVGProps<SVGSVGElement> & {
    size?: number;
    variant?: IconVariant;
  },
  ref: React.Ref<SVGSVGElement>
) => {
  let stroke = "text-foreground";
  if (variant === "primary") {
    stroke = "text-primary";
  } else if (variant === "success") {
    stroke = "text-chart-2";
  } else if (variant === "info") {
    stroke = "text-chart-1";
  } else if (variant === "warning") {
    stroke = "text-chart-3";
  } else if (variant === "error") {
    stroke = "text-destructive";
  } else if (variant === "alternate") {
    stroke = "text-alternate";
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 500}
      height={props.size || 500}
      fill="none"
      ref={ref}
      viewBox="0 0 500 500"
      {...props}
    >
      <path
        className={stroke}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={46.875}
        d="m358.238 196.428 54.216 18.321c11.471 3.878 22.834-5.732 19.409-17.348C408.894 119.451 336.166 62.5 250 62.5c-85.806 0-158.287 56.478-181.574 133.928m73.335 107.143-54.212-18.32c-11.473-3.878-22.835 5.732-19.412 17.348C91.107 380.55 163.835 437.5 250 437.5c85.807 0 158.288-56.478 181.575-133.929"
      />
    </svg>
  );
};
const RefreshingIcon = React.forwardRef(SvgComponent);
export default RefreshingIcon;
