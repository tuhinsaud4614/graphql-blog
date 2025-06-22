import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

function SvgComponent(
  { size = 16, ...props }: Readonly<Props>,
  ref: React.Ref<SVGSVGElement>,
) {
  const id = React.useId;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      ref={ref}
      {...props}
    >
      <g clipPath={`url(#${id})`}>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M11.947 12.456C13.79 11.376 15 9.559 15 7.5c0-3.314-3.134-6-7-6s-7 2.686-7 6 3.134 6 7 6c.172 0 .342-.005.511-.016A4.764 4.764 0 0 0 12.5 14.5a3.328 3.328 0 0 1-.553-2.044Z"
          clipRule="evenodd"
        />
        <path
          fill="currentColor"
          d="m11.947 12.456-.303-.518a.6.6 0 0 0-.296.482l.599.036ZM8.51 13.484l.385-.46a.6.6 0 0 0-.422-.139l.037.6ZM12.5 14.5l.118.588a.6.6 0 0 0 .381-.92l-.499.332Zm1.9-7c0 1.809-1.063 3.445-2.757 4.438l.607 1.036c1.993-1.169 3.35-3.165 3.35-5.474h-1.2ZM8 2.1c3.625 0 6.4 2.501 6.4 5.4h1.2C15.6 3.771 12.107.9 8 .9v1.2ZM1.6 7.5c0-2.899 2.775-5.4 6.4-5.4V.9C3.893.9.4 3.771.4 7.5h1.2ZM8 12.9c-3.625 0-6.4-2.501-6.4-5.4H.4c0 3.729 3.493 6.6 7.6 6.6v-1.2Zm.474-.015c-.156.01-.314.015-.474.015v1.2c.184 0 .367-.006.548-.017l-.074-1.198Zm3.908 1.027a4.164 4.164 0 0 1-3.486-.888l-.77.92a5.364 5.364 0 0 0 4.492 1.144l-.236-1.176Zm-1.034-1.492c-.05.842.171 1.691.653 2.413l.998-.666a2.728 2.728 0 0 1-.453-1.675l-1.198-.072Z"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.2}
          d="M4.5 6H11M4.5 9H8"
        />
      </g>
      <defs>
        <clipPath id={`${id}`}>
          <path fill="currentColor" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
const ChatPop = React.forwardRef(SvgComponent);
export default ChatPop;
