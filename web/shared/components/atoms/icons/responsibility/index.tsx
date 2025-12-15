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
        fillOpacity={0.1}
        d="M421.875 343.75H78.125C34.978 343.75 0 378.728 0 421.875S34.978 500 78.125 500h343.75C465.022 500 500 465.022 500 421.875s-34.978-78.125-78.125-78.125Z"
      />
      <path
        className={fill}
        fill="currentColor"
        fillOpacity={0.1}
        d="M421.875 343.75H78.125C34.978 343.75 0 378.728 0 421.875S34.978 500 78.125 500h343.75C465.022 500 500 465.022 500 421.875s-34.978-78.125-78.125-78.125Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={18.75}
        d="M250 343.75v109.375M359.375 453.125 250 382.812l-109.375 70.313"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeWidth={18.75}
        d="M144.515 40.8a373.836 373.836 0 0 1 210.968 0 28.946 28.946 0 0 1 20.63 24.81l25.086 244.66c1.32 12.895-8.797 24.109-21.759 24.109H120.559c-12.963 0-23.08-11.214-21.76-24.109l25.086-244.66a28.943 28.943 0 0 1 20.63-24.81Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={18.75}
        d="M402.862 228.117c17.283.002 30.83 14.847 29.266 32.06l-5.569 61.385c-3.073 33.802-31.426 59.693-65.368 59.693H138.809c-33.941 0-62.296-25.891-65.368-59.693l-5.57-61.385c-1.564-17.213 11.984-32.058 29.266-32.06 15.288 0 28.028 11.728 29.297 26.963l3.647 43.868c1.08 12.957 11.917 22.918 24.918 22.919h190.002c13-.001 23.838-9.962 24.918-22.919l3.647-43.868c1.27-15.235 14.009-26.963 29.296-26.963Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={18.75}
        d="M125 93.75h250"
      />
    </svg>
  );
};
const ResponsibilityIcon = React.forwardRef(SvgComponent);
export default ResponsibilityIcon;
