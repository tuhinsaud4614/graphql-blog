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
  let stroke = "text-foreground";
  if (variant === "primary") {
    stroke = "text-primary";
  } else if (variant === "success") {
    stroke = "text-chart-2";
  } else if (variant === "info") {
    stroke = "text-chart-1";
  } else if (variant === "warning") {
    stroke = "text-chart-3";
  } else if (variant === "error") {
    stroke = "text-destructive";
  } else if (variant === "alternate") {
    stroke = "text-alternate";
  } else if (variant === "adaptive") {
    stroke = "";
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
        className={stroke}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={31.25}
        d="M250 62.5V125M250 375v62.5M437.5 250H375M125 250H62.5M382.573 117.43l-44.194 44.194M161.626 338.383l-44.194 44.194M382.573 382.577l-44.194-44.194M161.626 161.624l-44.194-44.194"
      />
    </svg>
  );
};
const SpinnerIcon = React.forwardRef(SvgComponent);
export default SpinnerIcon;
