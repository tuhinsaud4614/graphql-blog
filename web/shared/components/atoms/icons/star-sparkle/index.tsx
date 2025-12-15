import * as React from "react";

import { IconVariant } from "@/lib/types";
import { cn } from "@/lib/utils";

// Gradient color configurations for each variant using CSS variables
const gradientColors: Record<
  IconVariant,
  { stopColor1: string; stopColor2: string }
> = {
  normal: {
    stopColor1: "var(--gradient-normal-start)",
    stopColor2: "var(--gradient-normal-end)",
  },
  primary: {
    stopColor1: "var(--gradient-primary-start)",
    stopColor2: "var(--gradient-primary-end)",
  },
  success: {
    stopColor1: "var(--gradient-success-start)",
    stopColor2: "var(--gradient-success-end)",
  },
  info: {
    stopColor1: "var(--gradient-info-start)",
    stopColor2: "var(--gradient-info-end)",
  },
  warning: {
    stopColor1: "var(--gradient-warning-start)",
    stopColor2: "var(--gradient-warning-end)",
  },
  error: {
    stopColor1: "var(--gradient-error-start)",
    stopColor2: "var(--gradient-error-end)",
  },
  alternate: {
    stopColor1: "var(--gradient-alternate-start)",
    stopColor2: "var(--gradient-alternate-end)",
  },
};

const SvgComponent = (
  {
    variant = "normal",
    useGradient,
    ...props
  }: React.SVGProps<SVGSVGElement> & {
    size?: number;
    variant?: IconVariant;
    useGradient?: boolean;
  },
  ref: React.Ref<SVGSVGElement>
) => {
  const idA = `a${React.useId()}`;
  const idB = `b${React.useId()}`;

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

  const { stopColor1, stopColor2 } = gradientColors[variant];

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
        fill={`url(#${idA})`}
        d="M253.227 449.384 250 468.749l-3.227-19.365c-16.763-100.577-95.581-179.395-196.16-196.157l-19.363-3.228 19.367-3.227c100.578-16.764 179.392-95.579 196.156-196.157L250 31.25l3.227 19.365c16.763 100.578 95.578 179.393 196.156 196.157l19.367 3.227-19.362 3.228c-100.581 16.762-179.398 95.58-196.161 196.157Z"
      />
      <path
        className={cn(fill, useGradient && "hidden")}
        fill="currentColor"
        d="M253.227 449.384 250 468.749l-3.227-19.365c-16.763-100.577-95.581-179.395-196.16-196.157l-19.363-3.228 19.367-3.227c100.578-16.764 179.392-95.579 196.156-196.157L250 31.25l3.227 19.365c16.763 100.578 95.578 179.393 196.156 196.157l19.367 3.227-19.362 3.228c-100.581 16.762-179.398 95.58-196.161 196.157Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={37.5}
        d="M253.227 449.384 250 468.749l-3.227-19.365c-16.763-100.577-95.581-179.395-196.16-196.157l-19.363-3.228 19.367-3.227c100.578-16.764 179.392-95.579 196.156-196.157L250 31.25l3.227 19.365c16.763 100.578 95.578 179.393 196.155 196.157l19.368 3.227-19.362 3.228c-100.58 16.762-179.398 95.58-196.161 196.157Z"
      />
      <path
        fill={`url(#${idB})`}
        d="m99.493 139.021-5.742 17.229-5.744-17.23A62.501 62.501 0 0 0 48.48 99.492L31.25 93.75l17.228-5.743a62.499 62.499 0 0 0 39.53-39.527L93.75 31.25l5.742 17.227a62.5 62.5 0 0 0 39.53 39.53l17.227 5.742-17.229 5.743a62.5 62.5 0 0 0-39.527 39.529Z"
      />
      <path
        className={cn(fill, useGradient && "hidden")}
        fill="currentColor"
        d="m99.493 139.021-5.742 17.229-5.744-17.23A62.501 62.501 0 0 0 48.48 99.492L31.25 93.75l17.228-5.743a62.499 62.499 0 0 0 39.53-39.527L93.75 31.25l5.742 17.227a62.5 62.5 0 0 0 39.53 39.53l17.227 5.742-17.229 5.743a62.5 62.5 0 0 0-39.527 39.529Z"
      />
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={34.375}
        d="m99.493 139.021-5.742 17.229-5.744-17.23A62.501 62.501 0 0 0 48.48 99.492L31.25 93.75l17.228-5.743a62.499 62.499 0 0 0 39.53-39.527L93.75 31.25l5.742 17.227a62.5 62.5 0 0 0 39.53 39.53l17.227 5.742-17.229 5.743a62.499 62.499 0 0 0-39.527 39.529Z"
      />
      <defs>
        <linearGradient
          id={idA}
          x1={140.625}
          x2={406.25}
          y1={140.623}
          y2={453.124}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={stopColor1} />
          <stop offset={1} stopColor={stopColor2} />
        </linearGradient>
        <linearGradient
          id={idB}
          x1={52.083}
          x2={153.276}
          y1={52.081}
          y2={171.129}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={stopColor1} />
          <stop offset={1} stopColor={stopColor2} />
        </linearGradient>
      </defs>
    </svg>
  );
};
const StarSparkleIcon = React.forwardRef(SvgComponent);
export default StarSparkleIcon;
