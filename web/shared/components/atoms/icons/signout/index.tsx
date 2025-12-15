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
  const id = React.useId();

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
      <g
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={35.938}
        clipPath={`url(#${id})`}
      >
        <path
          className={fill}
          fill="currentColor"
          d="M250 17.977c128.147 0 232.025 103.878 232.025 232.025S378.147 482.027 250 482.027 17.975 378.149 17.975 250.002 121.853 17.977 250 17.977Z"
        />
        <path
          strokeLinecap="round"
          d="M234.375 171.875 145.832 250l88.543 78.125"
        />
        <path
          strokeLinecap="round"
          d="M166.668 250h117.263a106.694 106.694 0 0 0 75.444-31.25"
        />
      </g>
      <defs>
        <clipPath id={id}>
          <path className={fill} fill="currentColor" d="M0 0h500v500H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
const SignoutIcon = React.forwardRef(SvgComponent);
export default SignoutIcon;
