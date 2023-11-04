"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSession } from "next-auth/react";

import { ROUTES } from "@/lib/constants";
import { skeletonVariant } from "@/lib/variants/classVariants";

import NotificationBell from "./NotificationBell";

const ThemeButton = dynamic(() => import("./ThemeButton"), {
  ssr: false,
  loading() {
    return (
      <li
        className={skeletonVariant({
          className: "h-9 w-9",
          shape: "circle",
        })}
      />
    );
  },
});

const className = {
  root: "lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-base-200 [@supports(backdrop-filter:blur(0px))]:bg-slate-200/50 dark:[@supports(backdrop-filter:blur(0px))]:bg-base-200/50 backdrop-blur-sm shadow-mui px-4",
  nav: "flex items-center justify-between h-full",
  homeLink: "flex items-center justify-center h-[3.125rem] w-[3.125rem]",
  items: "list-none m-0 flex items-center space-x-3",
  link: "cursor-pointer select-none active:scale-95 text-accent hover:text-accent-focus dark:hover:text-accent",
};

export default function UserHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <header className={className.root}>
      <nav className={className.nav}>
        <Link
          href={ROUTES.user.home}
          className={className.homeLink}
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
        <ul className={className.items}>
          {!!session?.user && (
            <li>
              <NotificationBell pathname={pathname} />
            </li>
          )}
          <ThemeButton />
        </ul>
      </nav>
    </header>
  );
}
