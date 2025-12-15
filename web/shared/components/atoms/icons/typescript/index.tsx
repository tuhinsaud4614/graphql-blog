import * as React from "react";

const SvgComponent = (
  {
    ...props
  }: React.SVGProps<SVGSVGElement> & {
    size?: number;
  },
  ref: React.Ref<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      fill="none"
      ref={ref}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        className="text-foreground"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.5 12c0-4.478 0-6.717 1.391-8.109 1.391-1.39 3.63-1.39 8.109-1.39 4.478 0 6.718 0 8.109 1.39 1.391 1.392 1.391 3.63 1.391 8.11 0 4.478 0 6.717-1.391 8.108C18.717 21.5 16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12Z"
      />
      <path
        className="text-foreground"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M18 12h-1.8a1.2 1.2 0 0 0-1.2 1.2v.6a1.2 1.2 0 0 0 1.2 1.2h.6a1.2 1.2 0 0 1 1.2 1.2v.6a1.2 1.2 0 0 1-1.2 1.2H15M8.5 12h2m2 0h-2m0 0v6"
      />
    </svg>
  );
};
const TypescriptIcon = React.forwardRef(SvgComponent);
export default TypescriptIcon;
