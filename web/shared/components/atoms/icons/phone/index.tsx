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
            d="m225.753 163.251-68.495-68.494c-26.446-26.447-69.324-26.447-95.77 0-36.916 36.916-46.793 92.982-24.716 140.291l8.499 18.212a416.86 416.86 0 0 0 201.464 201.465l18.212 8.497c47.309 22.078 103.376 12.2 140.292-24.716 26.447-26.447 26.447-69.322 0-95.769l-68.494-68.495c-13.391-13.39-35.102-13.39-48.492 0l-27.838 27.838c-5.753 5.753-15.081 5.753-20.833 0l-41.667-41.667c-5.753-5.753-5.753-15.08 0-20.833l27.838-27.838c13.39-13.39 13.39-35.1 0-48.491Z"
          />
          <path
            stroke="var(--foreground)"
            strokeLinejoin="round"
            strokeWidth={35.938}
            d="m171.874 249.997 46.313-46.312c17.569-17.57 17.569-46.056 0-63.625l-59.84-59.84c-26.503-26.503-69.898-25.058-94.58 3.15L53.585 95.006c-33 37.715-42.61 90.512-25.013 137.435C69.985 342.875 157.12 430.013 267.555 471.425c46.922 17.597 99.719 7.988 137.435-25.015l11.637-10.182c28.206-24.681 29.653-68.075 3.147-94.581l-59.837-59.837c-17.569-17.57-46.057-17.57-63.625 0l-46.313 46.312"
          />
          <path
            stroke="var(--foreground)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={35.938}
            d="M312.5 46.875c77.666 0 140.625 62.96 140.625 140.625M296.875 140.625c34.519 0 62.5 27.982 62.5 62.5"
          />
          <path
            stroke="var(--foreground)"
            strokeLinecap="round"
            strokeWidth={35.938}
            d="m128.123 212.5 156.25 156.25"
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
const PhoneIcon = React.forwardRef(SvgComponent);
export default PhoneIcon;
