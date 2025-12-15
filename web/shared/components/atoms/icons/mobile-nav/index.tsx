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
        strokeWidth={29.167}
        d="M402.08 93.466v313.07c-.002 29.873-20.333 55.904-49.317 63.15a423.665 423.665 0 0 1-205.525 0c-28.982-7.246-49.314-33.277-49.316-63.15V93.466c.003-29.874 20.334-55.906 49.316-63.151a423.701 423.701 0 0 1 205.525 0c28.984 7.245 49.315 33.277 49.317 63.15Z"
      />
      <path
        stroke="var(--foreground)"
        strokeWidth={29.167}
        d="m104.166 388.023 3.759.738a727.061 727.061 0 0 0 284.001-.738"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeWidth={29.167}
        d="M218.75 83.336h62.5"
      />
    </svg>
  );
};
const MobileNavIcon = React.forwardRef(SvgComponent);
export default MobileNavIcon;
