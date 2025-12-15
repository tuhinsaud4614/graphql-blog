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
        strokeWidth={35.938}
        d="M142.395 17.977a53.232 53.232 0 0 1 37.628 15.594l67.658 67.658a53.232 53.232 0 0 1 15.594 37.628c0 68.713-55.706 124.42-124.42 124.42a53.229 53.229 0 0 1-37.628-15.595l-67.658-67.657a53.234 53.234 0 0 1-15.594-37.628c0-68.714 55.706-124.42 124.42-124.42ZM348.206 236.727a46.769 46.769 0 0 1 33.05 13.702l87.066 87.066a46.77 46.77 0 0 1 13.703 33.05c0 61.566-49.916 111.482-111.481 111.482a46.77 46.77 0 0 1-33.05-13.704l-87.067-87.065a46.775 46.775 0 0 1-13.702-33.05c0-61.566 49.916-111.481 111.481-111.481Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeWidth={35.938}
        d="m343.75 343.75-187.5-187.5"
      />
    </svg>
  );
};
const LinkIcon = React.forwardRef(SvgComponent);
export default LinkIcon;
