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
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={18.75}
        d="M140.625 453.125 250 234.375l109.375 218.75"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={18.75}
        d="M250 56.242c98.375 0 178.132 79.755 178.132 178.131 0 98.375-79.757 178.132-178.132 178.132-98.376 0-178.13-79.757-178.13-178.132 0-98.376 79.754-178.13 178.13-178.13Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={18.75}
        d="M250 118.742c63.858 0 115.631 51.773 115.631 115.631S313.858 350.005 250 350.005s-115.631-51.774-115.631-115.632c0-63.858 51.773-115.631 115.631-115.631Z"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={18.75}
        d="M250 287.5c29.34 0 53.125-23.785 53.125-53.125S279.34 181.25 250 181.25s-53.125 23.785-53.125 53.125S220.66 287.5 250 287.5Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={18.75}
        d="m250 234.375 125-125"
      />
      <path
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeLinejoin="round"
        strokeWidth={18.75}
        d="M304.688 179.688v-40.429a69.45 69.45 0 0 1 5.617-27.365 123.497 123.497 0 0 1 58.282-61.813L375 46.875l7.812 54.687 54.688 7.813-31.25 39.063a106.694 106.694 0 0 1-75.444 31.25h-26.118Z"
      />
    </svg>
  );
};
const SkillIcon = React.forwardRef(SvgComponent);
export default SkillIcon;
