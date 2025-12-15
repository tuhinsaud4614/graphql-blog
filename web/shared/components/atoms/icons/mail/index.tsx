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
          width={props.size || 500}
          height={props.size || 500}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "luminance",
          }}
        >
          <path className={fill} fill="currentColor" d="M500 0H0v500h500V0Z" />
        </mask>
        <g clipPath={`url(#${id1})`}>
          <path
            className={fill}
            fill="currentColor"
            stroke="var(--foreground)"
            strokeWidth={35.938}
            d="M482.025 144.773v210.45c-.003 46.862-34.891 86.403-81.391 92.225a1214.57 1214.57 0 0 1-301.269 0c-46.5-5.822-81.387-45.363-81.39-92.225v-210.45c.003-46.864 34.89-86.404 81.39-92.224a1214.561 1214.561 0 0 1 301.269 0c46.5 5.82 81.388 45.36 81.391 92.224Z"
          />
          <path
            fill="var(--foreground)"
            d="M402.455 185.398c7.469-6.535 8.225-17.887 1.691-25.355-6.534-7.469-17.884-8.226-25.353-1.691l11.831 13.523 11.831 13.523Zm-386.83-13.523-7.203 16.462 177.302 77.57 7.202-16.462 7.202-16.462-177.302-77.57-7.202 16.462Zm309.718 57.122 11.831 13.523 65.281-57.122-11.831-13.523-11.831-13.523-65.285 57.123 11.835 13.522Zm-132.417 20.448-7.202 16.462c50.751 22.204 109.761 13.091 151.45-23.387l-11.831-13.523-11.835-13.522c-31.209 27.308-75.385 34.13-113.38 17.508l-7.202 16.462Z"
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
const MailIcon = React.forwardRef(SvgComponent);
export default MailIcon;
