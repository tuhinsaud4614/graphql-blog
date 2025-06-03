"use client";

import dynamic from "next/dynamic";
import Image from "next/legacy/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMediaQuery } from "usehooks-ts";

import { Badge, ClientOnly, UserAvatarBtn } from "@/components";
import useUser from "@/hooks/useUser";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BellIcon, EditIcon, FileTextIcon, HeartIcon, HomeIcon } from "lucide-react";

const Theme = dynamic(() => import("@/components/Theme"), { ssr: false });

const className = {
  root: "hidden shrink-0 lg:block min-h-screen w-20 border-r dark:border-base-dark-300 relative",
  nav: "h-screen sticky inset-0 z-10 flex flex-col justify-between items-center py-4 overflow-y-auto scrollbar-hide",
  homeLink: "flex items-center justify-center h-[3.125rem] w-[3.125rem]",
  items: "w-full flex flex-col justify-center items-center py-3",
  item: "w-full pb-8",
  link: "w-full flex items-center justify-center text-neutral dark:text-neutral-dark active:scale-95",
};

export default function SideNav() {
  const pathname = usePathname();
  const matches = useMediaQuery("(min-width: 1024px)");

  return (
    <aside className={className.root}>
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
          <li className={className.item}>
            <Link href={ROUTES.user.home} aria-label="Home"
                className={cn(
                  className.link,
                  pathname === ROUTES.user.home &&
                    "dark:!text-secondary-dark !text-secondary",
                )}
              >
                {pathname === ROUTES.user.home ? (
                  <HomeIcon size={24} className="fill-primary" />
                ) : (
                  <HomeIcon size={24} />
                )}
            </Link>
          </li>
          <li className={className.item}>
            <Link href={ROUTES.user.notifications} aria-label="Notifications"
                className={cn(
                  className.link,
                  pathname === ROUTES.user.notifications &&
                    "dark:!text-secondary-dark !text-secondary",
                )}
              >
                <span className="relative">
                  {pathname === ROUTES.user.notifications ? (
                    <BellIcon size={24} className="fill-primary" />
                  ) : (
                    <BellIcon size={24} />
                  )}
                  <ClientOnly>
                    <NotifyCount />
                  </ClientOnly>
                </span>
            </Link>
          </li>
          <li className={className.item}>
            <Link href={ROUTES.user.favorite} aria-label="Favorite"
                className={cn(
                  className.link,
                  pathname === ROUTES.user.favorite &&
                    "dark:!text-secondary-dark !text-secondary",
                )}
              >
                {pathname === ROUTES.user.favorite ? (
                  <HeartIcon size={24} className="fill-primary" />
                ) : (
                  <HeartIcon size={24} />
                )}
            </Link>
          </li>
          <li className={className.item}>
            <Link href={ROUTES.user.posts} aria-label="My posts"
                className={cn(
                  className.link,
                  pathname === ROUTES.user.posts &&
                    "dark:!text-secondary-dark !text-secondary",
                )}
              >
                <FileTextIcon size={24} />
            </Link>
          </li>
          <li className={className.item}>
            <Link href={ROUTES.user.postCreate} aria-label="Create post"
                className={cn(
                  className.link,
                  pathname === ROUTES.user.postCreate &&
                    "dark:!text-secondary-dark !text-secondary",
                )}
              >
                <EditIcon size={24} />
            </Link>
          </li>
          <li>
            {matches && (
              <Theme
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              />
            )}
          </li>
        </ul>
        <ClientOnly>
          <UserAvatarBtn
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
            hideOnSmallDevice
          />
        </ClientOnly>
      </nav>
    </aside>
  );
}

function NotifyCount() {
  const count = 100;
  const user = useUser();

  return user && !!count ? (
    <Badge variant="secondary">{count >= 100 ? "99+" : count}</Badge>
  ) : null;
}
