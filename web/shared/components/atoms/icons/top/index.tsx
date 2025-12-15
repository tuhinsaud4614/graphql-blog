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
  let stroke = "text-background";
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
      <g>
        <path
          fill="var(--foreground)"
          d="M500 250C500 111.929 388.071 0 250 0S0 111.929 0 250s111.929 250 250 250 250-111.929 250-250Z"
        />
        <path
          className={stroke}
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth={15}
          d="m203.25 233.437 44.798-55.999a2.5 2.5 0 0 1 3.905 0l44.797 55.999c1.31 1.636.145 4.061-1.951 4.061h-89.598c-2.096 0-3.261-2.425-1.951-4.061Z"
        />
        <path
          className={stroke}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={15}
          d="M250 237.5v75M250 337.5v25"
        />
      </g>
    </svg>
  );
};
const TopIcon = React.forwardRef(SvgComponent);
export default TopIcon;
