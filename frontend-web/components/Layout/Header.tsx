"use client";

import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BellIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { Badge, ClientOnly } from "@/components";
import useUser from "@/hooks/useUser";
import { ROUTES } from "@/lib/constants";

const Theme = dynamic(() => import("@/components/Theme"), { ssr: false });

const className = {
  root: "lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-base-200 [@supports(backdrop-filter:blur(0px))]:bg-slate-200/50 dark:bg-base-dark-200 dark:[@supports(backdrop-filter:blur(0px))]:bg-base-dark-200/50 backdrop-blur-sm shadow-mui px-4",
  nav: "flex items-center justify-between",
  homeLink: "flex items-center justify-center h-[3.125rem] w-[3.125rem]",
  items: "list-none m-0 flex items-center space-x-3",
  notifications:
    "w-9 h-9 flex items-center justify-center rounded-full border border-accent hover:border-accent-focus dark:border-accent-dark dark:hover:border-accent text-accent hover:text-accent-focus dark:text-accent-dark dark:hover:text-accent cursor-pointer select-none active:scale-95",
  link: "cursor-pointer select-none active:scale-95 text-accent hover:text-accent-focus dark:text-accent-dark dark:hover:text-accent",
};

export default function Header() {
  const user = useUser();
  const pathname = usePathname();
  const matches = useMediaQuery("(min-width: 1024px)");
  return (
    <header className={className.root}>
      <nav className={className.nav}>
        <Link href="/" className={className.homeLink} aria-label="Home">
          <Image
            src="/logo.svg"
            alt="The Rat Diary"
            height={50}
            width={50}
            layout="fixed"
          />
        </Link>
        <ul className={className.items}>
          {!user && (
            <ClientOnly>
              <li>
                <Link
                  href={ROUTES.account.login}
                  className={className.link}
                  aria-label="Sign In"
                >
                  Sign In
                </Link>
              </li>
            </ClientOnly>
          )}
          <li>
            {!matches && (
              <Theme
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                classes={{ menuRoot: "mt-6" }}
              />
            )}
          </li>
          {!!user && pathname && (
            <ClientOnly>
              <li>
                <Bell pathname={pathname} />
              </li>
            </ClientOnly>
          )}
        </ul>
      </nav>
    </header>
  );
}

function Bell({ pathname }: Readonly<{ pathname: string }>) {
  const count = 100;

  return (
    <Link
      href={ROUTES.user.notifications}
      className={className.notifications}
      aria-label="Notifications"
      // onClick={() => setShow(false)}
    >
      <span className="relative">
        {pathname === ROUTES.user.notifications ? (
          <BellIcon size={20} className="fill-primary" />
        ) : (
          <BellIcon size={20} />
        )}

        {!!count && (
          <Badge variant="secondary">{count >= 100 ? "99+" : count}</Badge>
        )}
      </span>
    </Link>
  );
}
