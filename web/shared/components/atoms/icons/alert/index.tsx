"use client";

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
  const idA = React.useId();
  const idB = React.useId();
  const idC = React.useId();
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
      <g clipPath={`url(#a${idA})`}>
        <mask
          id={`b${idB}`}
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
        <g mask={`url(#b${idB})`}>
          <path
            className={fill}
            fill="currentColor"
            d="M343.444 423.406c-8.909 44.544-48.019 76.6-93.444 76.6-45.424 0-84.534-32.056-93.444-76.6l-11.689-58.531a809.025 809.025 0 0 0 210.268 0l-11.691 58.531Z"
          />
          <mask
            id={`c${idC}`}
            width={212}
            height={137}
            x={144}
            y={364}
            maskUnits="userSpaceOnUse"
            style={{
              maskType: "luminance",
            }}
          >
            <path
              className="text-background dark:text-foreground"
              fill="currentColor"
              d="M343.444 423.406c-8.909 44.544-48.019 76.6-93.444 76.6-45.424 0-84.534-32.056-93.444-76.6l-11.689-58.531a809.025 809.025 0 0 0 210.268 0l-11.691 58.531Z"
            />
          </mask>
          <g mask={`url(#c${idC})`}>
            <path
              className="text-foreground"
              fill="currentColor"
              d="m144.867 364.877 4.67-35.635-49.734-6.515 9.822 49.187 35.242-7.037Zm210.267 0 35.241 7.037 9.822-49.187-49.735 6.515 4.672 35.635Zm-11.69 58.531-35.238-7.05c-5.55 27.744-29.91 47.712-58.206 47.712v71.875c62.553 0 116.412-44.147 128.684-105.487l-35.24-7.05ZM250 500.008V464.07c-28.296 0-52.656-19.968-58.206-47.712l-35.239 7.05-35.242 7.037c12.272 61.341 66.134 105.5 128.687 105.5v-35.937Zm-93.445-76.6 35.239-7.05-11.685-58.519-35.242 7.038-35.242 7.037 11.688 58.531 35.242-7.037Zm-11.688-58.531-4.67 35.631a844.972 844.972 0 0 0 219.606 0l-4.669-35.631-4.672-35.635a773.038 773.038 0 0 1-200.925 0l-4.67 35.635Zm210.267 0-35.243-7.038-11.685 58.519 35.238 7.05 35.24 7.05 11.691-58.544-35.241-7.037Z"
            />
          </g>
          <path
            className={fill}
            fill="currentColor"
            stroke="var(--foreground)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={35.938}
            d="M162.354 48.77c53.072-35.38 122.221-35.38 175.293 0a99.38 99.38 0 0 1 43.091 67.566L399.81 240.39a78.3 78.3 0 0 0 37.109 55.206l23.072 13.855c11.494 6.899 17.138 20.505 13.888 33.508l-.428 1.647c-2.429 9.719-9.944 17.378-19.622 19.959a791.08 791.08 0 0 1-407.655 0c-9.678-2.581-17.194-10.24-19.623-19.959l-.427-1.647c-3.251-13.003 2.392-26.609 13.885-33.508l23.071-13.855a78.292 78.292 0 0 0 37.11-55.206l19.073-124.054a99.38 99.38 0 0 1 43.091-67.566Z"
          />
          <path
            className="text-foreground"
            fill="currentColor"
            d="M333.807 298.296c9.415-3.138 14.503-13.314 11.365-22.729-3.137-9.414-13.315-14.502-22.728-11.364l5.682 17.047 5.681 17.046ZM93.75 265.625l-5.682 17.046c72.633 24.211 133.467 28.34 176.459 26.293 21.482-1.023 38.489-3.587 50.277-5.944 5.893-1.179 10.487-2.307 13.684-3.166 1.597-.43 2.847-.793 3.738-1.062.446-.134.803-.245 1.065-.328l.328-.106c.044-.013.078-.026.113-.036l.04-.014a.35.35 0 0 0 .035-.012c.009-.002 0 0-5.681-17.046-5.682-17.047-5.688-17.045-5.682-17.047-.003.001.003-.001 0 0l.041-.014c.003-.001.009-.003 0 0l-.072.023c-.1.032-.287.09-.562.174a96.85 96.85 0 0 1-2.694.762c-2.478.667-6.31 1.614-11.401 2.632-10.185 2.037-25.404 4.357-44.938 5.287-39.039 1.859-95.393-1.825-163.385-24.489l-5.683 17.047Z"
          />
        </g>
      </g>
      <defs>
        <clipPath id={`a${idA}`}>
          <path
            className="text-background"
            fill="currentColor"
            d="M0 0h500v500H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
const AlertIcon = React.forwardRef(SvgComponent);
export default AlertIcon;
