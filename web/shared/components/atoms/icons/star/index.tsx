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
  const id1 = React.useId();

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
      <g clipPath={`url(#${id})`}>
        <mask
          id={id1}
          width={500}
          height={500}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "luminance",
          }}
        >
          <path
            className="text-background dark:text-foreground"
            fill="currentColor"
            d="M500 0H0v500h500V0Z"
          />
        </mask>
        <g mask={`url(#${id1})`}>
          <path
            className={fill}
            fill="currentColor"
            stroke="var(--foreground)"
            strokeLinejoin="round"
            strokeWidth={35.938}
            d="M237.518 58.272c4.253-11.623 20.711-11.623 24.963 0l36.774 100.495a49.205 49.205 0 0 0 45.257 32.287l108.613 2.106c12.759.247 17.859 16.588 7.506 24.048l-83.862 60.425c-17.272 12.444-24.588 34.585-18.125 54.87l31.034 97.475c3.803 11.937-9.506 22.009-19.956 15.106l-92.592-61.19a49.222 49.222 0 0 0-54.26 0l-92.59 61.19c-10.453 6.903-23.761-3.169-19.959-15.106l31.036-97.475c6.46-20.285-.854-42.426-18.127-54.87l-83.862-60.425c-10.353-7.46-5.253-23.801 7.507-24.048l108.612-2.106a49.207 49.207 0 0 0 45.258-32.287l36.773-100.495Z"
          />
        </g>
      </g>
      <defs>
        <clipPath id={id}>
          <path className={fill} fill="currentColor" d="M0 0h500v500H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
const StarIcon = React.forwardRef(SvgComponent);
export default StarIcon;
