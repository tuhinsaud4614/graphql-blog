"use client";

import Image from "next/image";
import Link from "next/link";

import UserShortProfile from "@/components/UserShortProfile";
import { ROUTES } from "@/lib/constants";
import { skeletonVariant } from "@/lib/variants/classVariants";
import dynamic from "next/dynamic";

const ThemeSwitch = dynamic(() => import("@/components/theme-switch"), {
  ssr: false,
  loading: () => (
    <span
      className={skeletonVariant({
        className: "h-9 w-9",
        shape: "circle",
      })}
    />
  ),
});

export default function PostHeader() {
  return (
    <header className="dark:bg-base-dark-200 fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
        <Link
          href={ROUTES.user.home}
          className="flex size-[3.125rem] items-center justify-center"
          aria-label="Home"
        >
          <Image
            src="/logo.svg"
            alt="The Rat Diary"
            height={50}
            width={50}
            priority
          />
        </Link>
        <div className="flex items-end gap-2">
          <UserShortProfile />
          <ThemeSwitch
            variant="accent"
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            tooltipOrigin={{ horizontal: "right" }}
          />
        </div>
      </nav>
    </header>
  );
}
