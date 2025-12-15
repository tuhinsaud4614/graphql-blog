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
        d="M250 17.9766C378.147 17.9766 482.025 121.855 482.025 250.002C482.025 378.149 378.147 482.027 250 482.027C121.853 482.027 17.9746 378.149 17.9746 250.002C17.9746 121.855 121.853 17.9766 250 17.9766Z"
        className={fill}
        fill="currentColor"
        stroke="var(--foreground)"
        strokeWidth="35.9375"
      />
      <path
        d="M250 359.375C258.629 359.375 265.625 366.372 265.625 375C265.625 383.628 258.629 390.625 250 390.625C241.371 390.625 234.375 383.628 234.375 375C234.375 366.372 241.371 359.375 250 359.375Z"
        stroke="var(--foreground)"
        strokeWidth="31.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M187.5 187.497V171.796C187.5 161.731 190.926 151.965 197.213 144.105C224.275 110.278 275.725 110.278 302.787 144.105C309.074 151.965 312.5 161.731 312.5 171.796V176.975C312.5 193.435 304.75 208.934 291.582 218.81L269.287 235.532C257.146 244.638 250 258.929 250 274.106V281.247"
        stroke="var(--foreground)"
        strokeWidth="35.9375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const NoteIcon = React.forwardRef(SvgComponent);
export default NoteIcon;
