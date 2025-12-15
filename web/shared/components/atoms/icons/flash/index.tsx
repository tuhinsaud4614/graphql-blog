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
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="m314.769 223.794 40.093-187.105c1.644-7.679-6.875-13.47-13.409-9.113L55.295 218.346c-7.203 4.802-3.803 16.03 4.854 16.03h116.48c5.586 0 9.741 5.163 8.548 10.62l-47.364 216.521c-1.73 7.906 7.279 13.722 13.771 8.89l295.975-220.261c6.76-5.031 3.203-15.77-5.225-15.77H323.325c-5.572 0-9.725-5.136-8.556-10.583Z"
      />
    </svg>
  );
};
const FlashIcon = React.forwardRef(SvgComponent);
export default FlashIcon;
