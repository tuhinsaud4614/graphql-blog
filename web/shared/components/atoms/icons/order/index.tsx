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
      viewBox="0 0 250 500"
      {...props}
    >
      <path
        className={fill}
        fill="currentColor"
        fillOpacity={0.8}
        d="M0 93.75c0-25.888 20.987-46.875 46.875-46.875S93.75 67.862 93.75 93.75s-20.987 46.875-46.875 46.875S0 119.638 0 93.75ZM0 250c0-25.888 20.987-46.875 46.875-46.875S93.75 224.112 93.75 250s-20.987 46.875-46.875 46.875S0 275.888 0 250ZM156.25 93.75c0-25.888 20.987-46.875 46.875-46.875S250 67.862 250 93.75s-20.987 46.875-46.875 46.875-46.875-20.987-46.875-46.875ZM0 406.25c0-25.888 20.987-46.875 46.875-46.875S93.75 380.362 93.75 406.25c0 25.887-20.987 46.875-46.875 46.875S0 432.137 0 406.25ZM156.25 250c0-25.888 20.987-46.875 46.875-46.875S250 224.112 250 250s-20.987 46.875-46.875 46.875S156.25 275.888 156.25 250ZM156.25 406.25c0-25.888 20.987-46.875 46.875-46.875S250 380.362 250 406.25c0 25.887-20.987 46.875-46.875 46.875s-46.875-20.988-46.875-46.875Z"
      />
    </svg>
  );
};
const OrderIcon = React.forwardRef(SvgComponent);
export default OrderIcon;
