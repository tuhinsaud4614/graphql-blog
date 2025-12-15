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
  const idA = "a" + React.useId();
  const idB = "b" + React.useId();

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
      <g clipPath={`url(#${idA})`}>
        <mask
          id={idB}
          width={500}
          height={500}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "luminance",
          }}
        >
          <path
            className="text-background dark:text-foreground"
            fill="currentColor"
            d="M500 0H0v500h500V0Z"
          />
        </mask>
        <g
          stroke="var(--foreground)"
          strokeWidth={35.938}
          mask={`url(#${idB})`}
        >
          <path
            className={fill}
            fill="currentColor"
            strokeLinejoin="round"
            d="M31.25 170.13C12.117 253.405 75.024 354.684 218.2 448.759c19.318 12.694 44.338 12.694 63.649-.009 143.148-94.175 205.845-196.173 186.901-278.62-29.428-128.08-187.743-143.654-218.723-37.01C219.046 26.475 60.677 42.05 31.25 170.13Z"
          />
          <path strokeLinecap="round" d="M31.25 31.25 437.5 437.5" />
        </g>
      </g>
      <defs>
        <clipPath id={idA}>
          <path fill="var(--background)" d="M0 0h500v500H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
const NoLikeIcon = React.forwardRef(SvgComponent);
export default NoLikeIcon;
