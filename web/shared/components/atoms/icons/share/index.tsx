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
  const id = `a${React.useId()}`;
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
        <mask
          id={id}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "luminance",
          }}
          x="0"
          y="0"
          width="500"
          height="500"
        >
          <path
            d="M500 0H0V500H500V0Z"
            className="text-background dark:text-foreground"
            fill="currentColor"
          />
        </mask>
        <g mask={`url(#${id})`}>
          <path
            d="M406.25 17.9766C448.103 17.9766 482.025 51.8989 482.025 93.7517C482.025 135.605 448.103 169.527 406.25 169.527C364.396 169.527 330.475 135.605 330.475 93.7517C330.475 51.8989 364.396 17.9766 406.25 17.9766Z"
            className={fill}
            fill="currentColor"
            stroke="var(--foreground)"
            stroke-width="35.9375"
          />
          <path
            d="M406.25 330.477C448.103 330.477 482.025 364.398 482.025 406.252C482.025 448.105 448.103 482.027 406.25 482.027C364.396 482.027 330.475 448.105 330.475 406.252C330.475 364.398 364.396 330.477 406.25 330.477Z"
            className={fill}
            fill="currentColor"
            stroke="var(--foreground)"
            stroke-width="35.9375"
          />
          <path
            d="M93.7498 174.227C135.603 174.227 169.525 208.149 169.525 250.002C169.525 291.854 135.603 325.777 93.7498 325.777C51.8969 325.777 17.9746 291.854 17.9746 250.002C17.9746 208.149 51.8969 174.227 93.7498 174.227Z"
            className={fill}
            fill="currentColor"
            stroke="var(--foreground)"
            stroke-width="35.9375"
          />
          <path
            d="M328.125 140.625L171.875 234.375"
            stroke="var(--foreground)"
            stroke-width="37.5"
            stroke-linecap="round"
          />
          <path
            d="M171.875 265.625L328.125 359.375"
            stroke="var(--foreground)"
            stroke-width="37.5"
            stroke-linecap="round"
          />
        </g>
      </g>
    </svg>
  );
};
const ShareIcon = React.forwardRef(SvgComponent);
export default ShareIcon;
