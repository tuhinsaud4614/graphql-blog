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
  const idA = `a${React.useId()}`;
  const idB = `b${React.useId()}`;

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
        <g mask={`url(#${idB})`}>
          <path
            className={fill}
            fill="currentColor"
            stroke="var(--foreground)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={35.938}
            d="M462.278 227.9 282.008 47.63C270.197 35.82 250 44.186 250 60.89v95.358c-120.812 0-218.75 97.937-218.75 218.75v31.25l25.232-25.232c50.82-50.818 127.459-65.578 193.518-37.268v95.359c0 16.703 20.197 25.069 32.008 13.256l180.27-180.268c12.203-12.204 12.203-31.991 0-44.195Z"
          />
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
const NextIcon = React.forwardRef(SvgComponent);
export default NextIcon;
