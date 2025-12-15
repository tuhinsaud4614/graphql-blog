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
        d="M31.25 170.13C12.117 253.405 75.024 354.684 218.2 448.759c19.318 12.694 44.338 12.694 63.649-.009 143.148-94.175 205.845-196.173 186.901-278.62-29.428-128.08-187.743-143.654-218.723-37.01C219.046 26.475 60.677 42.05 31.25 170.13Z"
      />
    </svg>
  );
};
const LikeIcon = React.forwardRef(SvgComponent);
export default LikeIcon;
