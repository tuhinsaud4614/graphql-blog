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
        d="m62.5 453.125-15.625-281.25L125 93.75l125-78.125L374.999 93.75l78.125 62.5v265.625l-62.5 62.5H109.375l-46.876-31.25Z"
      />
      <path
        fill="var(--foreground)"
        d="m479.619 173.883-7.628 229.432c-1.797 53.894-46.022 96.669-99.947 96.678H127.965l-5.005-.121c-51.631-2.554-93.2-44.338-94.94-96.557l-7.63-229.432 35.157-23.438 8.392 251.68c1.151 34.525 29.481 61.912 64.026 61.918h244.079c34.544-.009 62.875-27.393 64.028-61.918l8.391-251.68 35.156 23.438Z"
      />
      <path
        fill="var(--foreground)"
        stroke="var(--foreground)"
        strokeWidth={35.938}
        d="M250 330.477c7.335 0 13.275 5.94 13.275 13.275 0 7.334-5.94 13.275-13.275 13.275s-13.275-5.941-13.275-13.275c0-7.335 5.94-13.275 13.275-13.275Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeWidth={35.938}
        d="M140.625 221.875c15.625-15.625 56.641-50 109.375-50s93.751 34.375 109.376 50M312.5 281.163S296.875 250 250 250s-62.5 31.163-62.5 31.163M21.875 171.874l39.33-35.754a624.985 624.985 0 0 1 140.911-96.554l33.909-16.954a31.25 31.25 0 0 1 27.951 0l33.909 16.954a624.98 624.98 0 0 1 140.912 96.555l39.329 35.753"
      />
    </svg>
  );
};
const RemoteIcon = React.forwardRef(SvgComponent);
export default RemoteIcon;
