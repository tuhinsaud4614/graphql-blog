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
  const idA = "a" + React.useId();
  const idB = "b" + React.useId();
  const idC = "c" + React.useId();
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
      <g clipPath={`url(#${idA})`}>
        <mask
          id={idB}
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
        <g mask={`url(#${idB})`}>
          <path
            className={fill}
            fill="currentColor"
            d="M0 250C0 111.929 111.929 0 250 0c138.072 0 250 111.929 250 250 0 138.072-111.928 250-250 250C111.929 500 0 388.072 0 250Z"
          />
          <mask
            id={idC}
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
              d="M0 250C0 111.929 111.929 0 250 0c138.072 0 250 111.929 250 250 0 138.072-111.928 250-250 250C111.929 500 0 388.072 0 250Z"
            />
          </mask>
          <g mask={`url(#${idC})`}>
            <path
              className="text-foreground"
              fill="currentColor"
              d="M250 500v-35.937c-118.223 0-214.063-95.838-214.063-214.063h-71.875c0 157.919 128.019 285.938 285.938 285.938V500Zm250-250h-35.937c0 118.225-95.838 214.063-214.063 214.063v71.875c157.919 0 285.938-128.019 285.938-285.938H500ZM250 0v35.938c118.225 0 214.063 95.839 214.063 214.062h71.875C535.938 92.08 407.919-35.938 250-35.938V0Zm0 0v-35.938C92.08-35.938-35.938 92.082-35.938 250h71.876c0-118.223 95.839-214.063 214.062-214.063V0Z"
            />
          </g>
          <path
            stroke="var(--foreground)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={35.938}
            d="M156.25 250a341.568 341.568 0 0 1 53.518 69.425l14.19 24.325 20.464-44.649A491.825 491.825 0 0 1 343.75 156.25"
          />
        </g>
      </g>
      <defs>
        <clipPath id={idA}>
          <path fill="var(--background)" d="M0 0h500v500H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
const OkIcon = React.forwardRef(SvgComponent);
export default OkIcon;
