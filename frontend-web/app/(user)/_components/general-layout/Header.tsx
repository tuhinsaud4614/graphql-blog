"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeSwitch from "@/components/theme-switch";
import { useAuthUser } from "@/hooks/useAuth";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ROUTES } from "@/lib/constants";

import NotificationBell from "./NotificationBell";

const className = {
  root: "lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-base-200 [@supports(backdrop-filter:blur(0px))]:bg-slate-200/50 dark:[@supports(backdrop-filter:blur(0px))]:bg-base-200/50 backdrop-blur-sm shadow-mui px-4",
  nav: "flex items-center justify-between",
  homeLink: "flex items-center justify-center h-[3.125rem] w-[3.125rem]",
  items: "list-none m-0 flex items-center space-x-3",
  link: "cursor-pointer select-none active:scale-95 text-accent hover:text-accent-focus dark:hover:text-accent",
};

export default function GeneralLayoutHeader() {
  const user = useAuthUser();
  const pathname = usePathname();
  const matches = useMediaQuery("(min-width: 1024px)");
  return (
    <header className={className.root}>
      <nav className={className.nav}>
        <Link
          href={ROUTES.myHome}
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
          {!user && (
            <li>
              <Link
                href={ROUTES.login}
                className={className.link}
                aria-label="Sign In"
              >
                Sign In
              </Link>
            </li>
          )}
          <li>
            {!matches && (
              <ThemeSwitch
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                classes={{ menuRoot: "mt-6" }}
              />
            )}
          </li>
          {!!user && (
            <li>
              <NotificationBell pathname={pathname} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
