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
  let fill = "text-foreground";
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
        d="M41.667 395.831v-62.5c0-82.348 57.076-171.192 135.416-229.167l72.917 62.5c-45.523 49.435-65.009 82.085-62.5 166.667v62.5H41.667ZM250 395.831v-62.5c0-82.348 57.077-171.192 135.417-229.167l72.916 62.5c-45.523 49.435-65.008 82.085-62.5 166.667v62.5H250Z"
      />
    </svg>
  );
};
const QuoteIcon = React.forwardRef(SvgComponent);
export default QuoteIcon;
