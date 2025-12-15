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
        fill="var(--background)"
        stroke="var(--foreground)"
        strokeWidth={9.091}
        d="M77.253 162.932c3.415-12.979 15.15-22.026 28.572-22.026h288.349c13.422 0 25.157 9.047 28.573 22.026l47.029 178.712a52.276 52.276 0 0 1 1.01 21.897l-9.345 56.071c-2.922 17.534-18.093 30.385-35.869 30.385H74.428c-17.776 0-32.947-12.851-35.87-30.385l-9.344-56.071a52.274 52.274 0 0 1 1.01-21.897l47.029-178.712Z"
      />
      <path
        stroke="var(--foreground)"
        strokeWidth={9.091}
        d="M28.41 349.43h123.326c8.52 0 16.867 2.394 24.091 6.909l23.346 14.591a45.462 45.462 0 0 0 24.091 6.909h54.131a45.457 45.457 0 0 0 23.047-6.276l26.958-15.858a45.452 45.452 0 0 1 23.046-6.275h121.145"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeWidth={9.091}
        d="M152.273 147.727C152.273 93.754 196.027 50 250 50c53.974 0 97.727 43.754 97.727 97.727v92.295c0 3-2.432 5.433-5.432 5.433H250c-53.973 0-97.727-43.754-97.727-97.728Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeWidth={9.091}
        d="M278.409 176.137c-17.697-15.151-39.122-15.151-56.818 0"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={9.091}
        d="M210.227 125h25.568M267.045 125h25.569"
      />
    </svg>
  );
};
const NoneIcon = React.forwardRef(SvgComponent);
export default NoneIcon;
