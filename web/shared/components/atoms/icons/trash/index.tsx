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
        d="m125.002 468.75-31.25-46.875L78.127 281.25V93.75l125 15.625v-62.5l46.875-31.25 46.875 31.25v62.5L421.878 93.75v187.5L406.253 437.5l-31.25 31.25H125.002Z"
      />
      <path
        fill="var(--foreground)"
        d="M440.816 400.295c-1.85 55.584-47.447 99.693-103.056 99.703H162.222l-5.157-.122c-53.242-2.638-96.106-45.731-97.9-99.581L49.002 94.998l36.041 2.564 10.04 301.545c1.208 36.206 30.914 64.928 67.139 64.941H337.76c36.228-.006 65.931-28.731 67.137-64.941l10.438-313.386 36.134-5.127-10.653 319.701Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="M25 78.125a840.67 840.67 0 0 0 450 0"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={35.938}
        d="m187.502 93.75 4.256-17.025C198.44 50 222.453 31.25 250.002 31.25S301.564 50 308.246 76.725l4.257 17.025"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeWidth={35.938}
        d="M203.125 203.125v156.25M296.875 203.125v156.25"
      />
    </svg>
  );
};
const TrashIcon = React.forwardRef(SvgComponent);
export default TrashIcon;
