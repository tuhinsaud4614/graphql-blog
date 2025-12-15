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
        d="M250 20.836c126.565 0 229.167 102.601 229.167 229.167 0 56.412-20.436 108.02-54.24 147.95l17.598 55.845c3.704 11.755-6.131 23.35-18.331 21.607l-16.459-2.34a379.553 379.553 0 0 0-102.518-.65c-17.69 4.377-36.175 6.754-55.217 6.754-126.565 0-229.167-102.602-229.167-229.166C20.833 123.437 123.435 20.836 250 20.836Z"
      />
      <mask
        id={id}
        width={460}
        height={460}
        x={20}
        y={20}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <path
          className="text-background dark:text-foreground"
          fill="currentColor"
          d="M250 20.836c126.565 0 229.167 102.601 229.167 229.167 0 56.412-20.436 108.02-54.24 147.95l17.598 55.845c3.704 11.755-6.131 23.35-18.331 21.607l-16.459-2.34a379.553 379.553 0 0 0-102.518-.65c-17.69 4.377-36.175 6.754-55.217 6.754-126.565 0-229.167-102.602-229.167-229.166C20.833 123.437 123.435 20.836 250 20.836Z"
        />
      </mask>
      <g mask={`url(#${id})`}>
        <path
          fill="var(--foreground)"
          d="m424.927 397.955-22.26-18.848a29.17 29.17 0 0 0-5.559 27.613l27.819-8.765Zm-17.192 75.113-4.125 28.875.021.002 4.104-28.877Zm-102.518-.65-3.755-28.925a28.868 28.868 0 0 0-3.252.612l7.007 28.313ZM250 20.838v29.167c110.456 0 200 89.543 200 200h58.333C508.333 107.332 392.673-8.328 250-8.328v29.166Zm229.167 229.167H450c0 49.234-17.804 94.225-47.333 129.102l22.26 18.848 22.261 18.846c38.079-44.979 61.145-103.202 61.145-166.796h-29.166Zm-54.24 147.95-27.819 8.765 17.598 55.848 27.819-8.767 27.819-8.765-17.598-55.847-27.819 8.766Zm17.598 55.846-27.819 8.767c-2.744-8.709 4.542-17.329 13.613-16.034l-4.125 28.873-4.125 28.875c33.473 4.782 60.427-27.027 50.275-59.246l-27.819 8.765Zm-18.331 21.606 4.125-28.873-16.479-2.341-4.105 28.875-4.104 28.877 16.459 2.339 4.104-28.877Zm-16.459-2.339 4.125-28.873a408.76 408.76 0 0 0-110.398-.702l3.755 28.925 3.754 28.923a350.435 350.435 0 0 1 94.639.602l4.125-28.875Zm-102.518-.65-7.007-28.313c-15.473 3.827-31.608 5.9-48.21 5.9v58.334c21.481 0 42.317-2.684 62.223-7.609l-7.006-28.312ZM250 479.172v-29.167c-110.457 0-200-89.544-200-200H-8.333c0 142.673 115.659 258.334 258.333 258.334v-29.167ZM20.833 250.005H50c0-110.457 89.543-200 200-200V-8.328c-142.674 0-258.333 115.66-258.333 258.333h29.166Z"
        />
      </g>
      <path
        stroke="var(--foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={29.167}
        d="M204.168 146.875v57.292M295.833 146.875v57.292"
      />
    </svg>
  );
};
const AgentIcon = React.forwardRef(SvgComponent);
export default AgentIcon;
