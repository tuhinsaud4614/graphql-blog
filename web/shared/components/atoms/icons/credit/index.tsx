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
        strokeWidth={37.5}
        d="M125 386.779v-52.378c0-89.723 85.314-154.886 171.874-131.279l131.81-13.179c12.082-1.208 21.838 9.702 19.294 21.574-24.025 112.112-126.094 190.043-240.572 183.684l-78.568-4.366a4.063 4.063 0 0 1-3.838-4.056Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={37.5}
        d="m58.392 378.518-3.5-23.625C27.629 170.873 186.34 13.043 370.206 41.33c20.738 3.19 36.044 21.031 36.044 42.011v4.073c0 148.439-106.157 275.636-252.201 302.192l-63.968 11.628c-15.084 2.744-29.443-7.55-31.69-22.716Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={37.5}
        d="m31.25 453.125 109.405-175.047c27.421-43.874 20.93-100.869-15.655-137.453M78.125 390.625C119.792 307.292 237.5 125 375 62.5"
      />
    </svg>
  );
};
const CreditIcon = React.forwardRef(SvgComponent);
export default CreditIcon;
