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
        stroke="var(--foreground)"
        strokeWidth={35.938}
        d="M250 80.477c77.481 0 135.606 34.746 174.713 74.34 19.59 19.836 34.221 40.712 43.853 58.594 10.081 18.711 13.459 31.843 13.459 36.591 0 4.747-3.378 17.88-13.459 36.59-9.632 17.882-24.263 38.76-43.853 58.594-39.107 39.594-97.232 74.341-174.713 74.341S114.393 384.78 75.287 345.186c-19.59-19.834-34.22-40.712-43.854-58.594-10.079-18.71-13.458-31.843-13.458-36.59 0-4.748 3.38-17.88 13.458-36.591 9.634-17.882 24.263-38.758 43.854-58.594 39.106-39.594 97.232-74.34 174.713-74.34Z"
      />
      <path
        className="text-foreground"
        fill="currentColor"
        d="M242.554 172.289a62.166 62.166 0 0 0-8.179 30.854c0 34.517 27.982 62.499 62.5 62.499 11.237 0 21.741-3.018 30.853-8.209-3.731 39.674-37.079 70.709-77.728 70.709-43.147 0-78.125-34.977-78.125-78.125.007-40.628 31.03-73.977 70.679-77.728Z"
      />
      <path
        className="text-foreground"
        fill="currentColor"
        d="m242.554 172.289 16.836 9.588A19.377 19.377 0 0 0 240.729 153l1.825 19.289Zm85.174 85.144 19.291 1.814a19.38 19.38 0 0 0-8.782-18.09 19.372 19.372 0 0 0-20.1-.558l9.591 16.834Zm-85.174-85.144-16.837-9.587A81.542 81.542 0 0 0 215 203.138l19.375.005 19.375.004a42.8 42.8 0 0 1 5.64-21.27l-16.836-9.588Zm-8.179 30.854L215 203.138c0 45.218 36.657 81.88 81.875 81.88v-38.75c-23.817 0-43.125-19.304-43.125-43.121l-19.375-.004Zm62.5 62.5v19.375c14.762 0 28.556-3.977 40.444-10.75l-9.591-16.835-9.591-16.834c-6.334 3.608-13.552 5.669-21.262 5.669v19.375Zm30.853-8.21-19.29-1.814c-2.805 29.827-27.893 53.149-58.438 53.149V347.517c50.754 0 92.362-38.749 97.019-88.27l-19.291-1.814ZM250 328.142v-19.374c-32.447 0-58.75-26.304-58.75-58.75h-19.375l-19.375-.004c0 53.848 43.652 97.503 97.5 97.503v-19.375Zm-78.125-78.124h19.375c.005-30.531 23.322-55.62 53.128-58.44l-1.824-19.289L240.729 153c-49.491 4.682-88.22 46.288-88.229 97.014l19.375.004Z"
      />
    </svg>
  );
};
const EyeIcon = React.forwardRef(SvgComponent);
export default EyeIcon;
