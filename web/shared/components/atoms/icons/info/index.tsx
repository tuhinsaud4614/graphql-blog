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

  let fill = "text-foreground";
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
        <path
          className={fill}
          fill="currentColor"
          d="M500 250C500 111.929 388.071 0 250 0S0 111.929 0 250s111.929 250 250 250 250-111.929 250-250Z"
        />
        <path
          fill="var(--background)"
          d="M256.262 218.758c17.254.006 31.25 13.995 31.25 31.25v140.625c-.005 17.25-14 31.243-31.25 31.25H243.75c-17.256 0-31.245-13.997-31.25-31.25V250.008c0-17.259 13.991-31.25 31.25-31.25h12.512Zm-6.256-140.625c25.886.003 46.875 20.988 46.875 46.875-.005 25.881-20.993 46.872-46.875 46.875-25.885 0-46.87-20.991-46.875-46.875 0-25.889 20.987-46.875 46.875-46.875Z"
        />
      </g>
      <defs>
        <clipPath id={id}>
          <path fill="var(--foreground)" d="M0 0h500v500H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
const InfoIcon = React.forwardRef(SvgComponent);
export default InfoIcon;
