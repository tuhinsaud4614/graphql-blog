"use client";

import { cn } from "@/lib/utils";

interface Props {
  text: string;
  children: React.ReactNode;
  onClick?(): void;
  active: boolean;
}

export default function ThemeSwitchItem({
  active,
  children,
  onClick,
  text,
}: Props) {
  return (
    <li>
      <button
        aria-label={text}
        type="button"
        className={cn(
          "flex w-full items-center border-none px-2 py-1 outline-none hover:bg-base-200",
          active ? "text-accent" : "text-neutral",
        )}
        onClick={onClick}
      >
        {children}
        <span className="ml-2 text-sm font-semibold text-current">{text}</span>
      </button>
    </li>
  );
}
