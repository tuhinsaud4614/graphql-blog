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
  const id = React.useId();

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
      <g
        stroke="var(--foreground)"
        strokeWidth={35.938}
        clipPath={`url(#a${id})`}
      >
        <path
          className={fill}
          fill="currentColor"
          d="M250 17.977c128.147 0 232.025 103.878 232.025 232.025S378.147 482.027 250 482.027 17.975 378.149 17.975 250.002 121.853 17.977 250 17.977Z"
        />
        <path
          strokeLinecap="round"
          d="M343.75 171.875H182.697a39.063 39.063 0 0 0-36.269 24.555c-10.264 25.659 8.633 53.57 36.269 53.57h134.606c27.635 0 46.531 27.911 36.269 53.57a39.063 39.063 0 0 1-36.269 24.555H156.25M250 375V125"
        />
      </g>
      <defs>
        <clipPath id={`a${id}`}>
          <path className={fill} fill="currentColor" d="M0 0h500v500H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
const MoneyIcon = React.forwardRef(SvgComponent);
export default MoneyIcon;
