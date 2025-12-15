export default function Logo({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id="logo_gradient"
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#000000" />
          <stop offset="100%" stopColor="#666666" />
        </linearGradient>
      </defs>

      {/* Rounded Square Border */}
      <rect
        x="10"
        y="10"
        width="80"
        height="80"
        rx="20"
        ry="20"
        stroke="url(#logo_gradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Terminal Prompt > */}
      <path
        d="M38 42 L52 52 L38 62"
        stroke="url(#logo_gradient)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Underscore _ */}
      <line
        x1="60"
        y1="62"
        x2="75"
        y2="62"
        stroke="url(#logo_gradient)"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}
