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
  let fill = "text-background";
  if (variant === "primary") {
    fill = "text-primary";
  } else if (variant === "success") {
    fill = "text-chart-2";
  } else if (variant === "info") {
    fill = "text-chart-1";
  } else if (variant === "warning") {
    fill = "text-chart-3";
  } else if (variant === "error") {
    fill = "text-destructive";
  } else if (variant === "alternate") {
    fill = "text-alternate";
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
          className={fill}
          fill="currentColor"
          stroke="var(--foreground)"
          d="M250 17.9697C378.147 17.9697 482.03 121.853 482.03 250C482.03 378.147 378.147 482.03 250 482.03C121.853 482.03 17.9697 378.147 17.9697 250C17.9697 121.853 121.853 17.9697 250 17.9697Z"
          strokeWidth={35.94}
        />
        <path
          stroke="var(--foreground)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={35.94}
          d="M175 250C191.495 266.495 204.467 286.168 213.131 307.827L225 337.5L238.391 307.37C262.753 252.556 291.727 199.91 325 150"
        />
      </g>
    </svg>
  );
};
const SuccessIcon = React.forwardRef(SvgComponent);
export default SuccessIcon;
