"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/lib/constants";
import { skeletonVariant } from "@/lib/variants/classVariants";

const ThemeSwitch = dynamic(() => import("@/components/theme-switch"), {
  ssr: false,
  loading() {
    return (
      <span
        className={skeletonVariant({
          className: "h-9 w-9",
          shape: "circle",
        })}
      />
    );
  },
});

export default function AuthHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-secondary bg-primary">
      <nav className="flex h-full max-w-5xl items-center justify-between px-4 sm:mx-auto">
        <Link
          href="/"
          className="flex h-[3.75rem] w-[3.75rem] items-center justify-center"
          aria-label="Home"
        >
          <Image src="/logo.svg" alt="The Rat Diary" height={60} width={60} />
        </Link>
        <ul className="m-0 flex list-none items-center space-x-3">
          <li>
            <Link
              href={pathname === ROUTES.login ? ROUTES.register : ROUTES.login}
              className="inline-block cursor-pointer select-none text-base-100 hover:text-base-300 active:scale-95 dark:hover:text-base-200"
              aria-label={pathname === ROUTES.login ? "Sign Up" : "Sign In"}
            >
              {pathname === ROUTES.login ? "Sign Up" : "Sign In"}
            </Link>
          </li>
          <li>
            <ThemeSwitch
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
