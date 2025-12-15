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
        strokeLinejoin="round"
        strokeWidth={29.167}
        d="M292.927 44.392c6.531-5.14 14.373-6.74 21.038-4.72 32.548 9.882 61.918 27.125 86.162 49.805 5.098 4.77 7.644 12.361 6.469 20.589l-2.848 19.897c-2.858 20.029 8.369 39.391 27.119 46.916l18.637 7.467c7.719 3.091 13.023 9.09 14.606 15.889a219.35 219.35 0 0 1 0 99.529c-1.581 6.798-6.87 12.814-14.587 15.908l-18.656 7.467c-18.754 7.527-29.982 26.902-27.119 46.937l2.848 19.857c1.177 8.227-1.371 15.818-6.469 20.589-24.246 22.683-53.608 39.923-86.162 49.804-6.663 2.023-14.505.436-21.038-4.7l-15.787-12.41c-15.909-12.5-38.327-12.515-54.24-.021l-15.828 12.431c-6.528 5.127-14.356 6.719-21.017 4.7-32.553-9.881-61.938-27.104-86.181-49.783-5.102-4.775-7.632-12.377-6.45-20.61l2.849-19.857c2.862-20.035-8.362-39.412-27.12-46.937l-18.677-7.486c-7.714-3.096-13.01-9.096-14.587-15.889a219.855 219.855 0 0 1-5.677-49.744 220.12 220.12 0 0 1 5.677-49.785c1.58-6.797 6.883-12.799 14.607-15.889l18.636-7.467c18.755-7.524 29.998-26.885 27.14-46.916l-2.868-19.897c-1.182-8.234 1.367-15.836 6.47-20.61 24.241-22.674 53.616-39.901 86.161-49.784 6.665-2.023 14.505-.436 21.037 4.7l15.807 12.45c14.915 11.715 35.561 12.447 51.19 2.198l3.071-2.197 15.787-12.43Zm-42.906 132.446c-40.417 0-73.182 32.765-73.182 73.182.004 40.412 32.767 73.181 73.182 73.181 40.41-.004 73.177-32.771 73.181-73.181 0-40.415-32.769-73.178-73.181-73.182Z"
      />
    </svg>
  );
};
const SettingIcon = React.forwardRef(SvgComponent);
export default SettingIcon;
