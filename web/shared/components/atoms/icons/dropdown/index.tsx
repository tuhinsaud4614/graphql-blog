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
  } else if (variant === "adaptive") {
    fill = "";
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
        d="m229.781 331.575-75.906-104.371c-12.018-16.524-.214-39.704 20.219-39.704h151.811c20.432 0 32.235 23.18 20.219 39.704l-75.906 104.371c-9.984 13.728-30.454 13.728-40.437 0Z"
      />
    </svg>
  );
};
const DropdownIcon = React.forwardRef(SvgComponent);
export default DropdownIcon;
