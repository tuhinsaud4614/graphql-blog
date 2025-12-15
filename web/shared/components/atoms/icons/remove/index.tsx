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
        d="M250 17.977c128.147 0 232.025 103.878 232.025 232.025S378.147 482.027 250 482.027 17.975 378.149 17.975 250.002 121.853 17.977 250 17.977Z"
        strokeWidth={35.94}
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        d="m156.25 156.25 187.5 187.5M343.75 156.25l-187.5 187.5"
        strokeWidth={35.938}
      />
    </svg>
  );
};
const RemoveIcon = React.forwardRef(SvgComponent);
export default RemoveIcon;
