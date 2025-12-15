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
  const id = `a${React.useId()}`;
  const id2 = `b${React.useId()}`;

  let stroke = "text-foreground";
  if (variant === "primary") {
    stroke = "text-primary";
  } else if (variant === "success") {
    stroke = "text-chart-2";
  } else if (variant === "info") {
    stroke = "text-chart-1";
  } else if (variant === "warning") {
    stroke = "text-chart-3";
  } else if (variant === "error") {
    stroke = "text-destructive";
  } else if (variant === "alternate") {
    stroke = "text-alternate";
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
      <mask
        id={id}
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
      <g mask={`url(#${id})`}>
        <mask
          id={id2}
          width={443}
          height={500}
          x={57}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: "luminance",
          }}
        >
          <path
            className="text-background dark:text-foreground"
            fill="currentColor"
            d="M499.972 249.988c0 138.068-111.912 249.99-249.979 249.993-22.81 0-44.907-3.059-65.903-8.784-10.926-2.982-15.461-15.572-9.798-25.378 4.347-7.532 13.381-10.869 21.795-8.679a213.594 213.594 0 0 0 53.903 6.897c118.223-.003 214.038-95.825 214.038-214.047-.003-118.221-95.825-214.037-214.047-214.037-63.481.001-120.47 27.65-159.662 71.545-6.063 6.791-16.04 8.845-23.924 4.293-9.38-5.416-11.993-17.831-4.876-25.996C107.343 33.234 174.768.01 249.98.008c138.068 0 249.99 111.912 249.993 249.98Z"
          />
        </mask>
        <g mask={`url(#${id2})`}>
          <path
            className={stroke}
            fill="currentColor"
            d="m499.972 249.988-35.944.002c0 118.222-95.817 214.044-214.038 214.047l.003 35.944v35.937c157.915-.003 285.916-128.015 285.916-285.93h-35.937ZM249.993 499.981l-.003-35.944c-19.582 0-38.497-2.619-56.445-7.512l-9.455 34.672-9.455 34.671c24.044 6.557 49.319 10.05 75.358 10.05v-35.937Zm-53.907-42.841-9.056 34.778a249.622 249.622 0 0 0 62.963 8.063l-.003-35.944V428.1a177.639 177.639 0 0 1-44.847-5.738l-9.057 34.778Zm53.904 6.897.003 35.944c138.068-.003 249.979-111.924 249.979-249.993l-35.944.002h-35.937c0 98.375-79.728 178.107-178.101 178.11v35.937ZM464.028 249.99l35.944-.002C499.969 111.918 388.05.015 249.981.015V71.89c98.375 0 178.106 79.727 178.11 178.1h35.937ZM249.981 35.953V.015c-74.154.002-140.755 32.349-186.47 83.548l26.808 23.935 26.807 23.935c32.669-36.59 80.047-59.542 132.855-59.543V35.953ZM61.519 85.795l27.088 23.617c39.294-45.072 96.989-73.458 161.374-73.46V.016l-.003-35.945C163.942-35.928 86.785 2.128 34.43 62.18L61.52 85.794ZM249.981.015v35.938c118.221 0 214.044 95.818 214.047 214.037l35.944-.002h35.937C535.906 92.071 407.894-35.93 249.978-35.93l.003 35.945ZM66.395 111.791l17.969-31.123c8.395 4.847 13.337 18.313 4.243 28.744L61.52 85.795 34.431 62.18c-23.329 26.758-13.16 65.057 13.995 80.734l17.969-31.122ZM174.29 465.818l31.123 17.969c-4.465 7.735-12.603 9.638-18.384 8.131l9.056-34.778 9.057-34.778c-22.61-5.887-48.814 2.691-61.974 25.488l31.122 17.968Zm-83.972-358.32L63.512 83.563c4.193-4.696 12.629-7.643 20.852-2.895l-17.97 31.123-17.968 31.122c23.992 13.852 52.381 6.797 68.7-11.48l-26.807-23.935Zm93.771 383.699 9.455-34.672c14.016 3.822 16.817 18.69 11.869 27.262l-31.123-17.969-31.122-17.968c-16.274 28.187-4.403 68.234 31.466 78.018l9.455-34.671Z"
          />
        </g>
        <path
          className={stroke}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={35.938}
          d="M140.625 125h-93.75L62.5 31.25"
        />
        <path
          className={stroke}
          stroke="currentColor"
          strokeDasharray="46.88 62.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={37.5}
          d="M18.749 246.875c0 89.113 49.733 166.61 122.959 206.25"
        />
      </g>
    </svg>
  );
};
const UndoIcon = React.forwardRef(SvgComponent);
export default UndoIcon;
