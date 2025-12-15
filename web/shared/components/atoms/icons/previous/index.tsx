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
            d="m37.722 227.9 180.27-180.27C229.804 35.82 250 44.186 250 60.89v95.358c120.813 0 218.75 97.937 218.75 218.75v31.25l-25.231-25.232C392.7 330.198 316.06 315.438 250 343.748v95.359c0 16.703-20.196 25.069-32.008 13.256L37.722 272.095c-12.204-12.204-12.204-31.991 0-44.195Z"
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
const PreviousIcon = React.forwardRef(SvgComponent);
export default PreviousIcon;
