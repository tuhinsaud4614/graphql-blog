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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={37.5}
        d="M130.544 438.657c-30.966 11.397-61.952 18.925-83.669 14.469-4.496-21.753 3.022-52.741 14.42-83.694 25.54-69.358 85.359-119.783 153.295-148.899l113.535-48.658-48.658 113.534c-29.115 67.939-79.558 127.723-148.923 153.248Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={37.5}
        d="m93.75 312.5-69.376-97.127a25 25 0 0 1-2.017-25.711L38.238 157.9a31.25 31.25 0 0 1 27.95-17.275H218.75L312.5 187.5l-218.75 125ZM187.5 406.25l97.127 69.375a24.999 24.999 0 0 0 25.711 2.019l31.762-15.882a31.25 31.25 0 0 0 17.275-27.95V281.25L312.5 187.5l-125 218.75Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={37.5}
        d="m188.867 391.994-80.859-80.861a27.976 27.976 0 0 1-5.241-32.293l12.836-25.672C178.818 126.738 308.04 46.875 449.394 46.875a3.733 3.733 0 0 1 3.731 3.732c0 141.353-79.863 270.574-206.294 333.79l-25.671 12.834a27.975 27.975 0 0 1-32.293-5.237Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={37.5}
        d="M343.75 46.875c9.347 56.081 53.294 100.028 109.375 109.375"
      />
      <path
        fill="var(--foreground)"
        d="M281.25 187.5c0-17.259 13.992-31.25 31.25-31.25 17.259 0 31.25 13.991 31.25 31.25s-13.991 31.25-31.25 31.25c-17.258 0-31.25-13.991-31.25-31.25Z"
      />
    </svg>
  );
};
const RocketIcon = React.forwardRef(SvgComponent);
export default RocketIcon;
