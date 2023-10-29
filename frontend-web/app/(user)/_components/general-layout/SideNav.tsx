"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Bell, FileEdit, FileText, Heart, Home } from "lucide-react";

import ThemeSwitch from "@/components/theme-switch";
import UserAvatarButton from "@/components/user-avatar-button";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import SideNavItem from "./SideNavItem";
import SideNavNotifyCount from "./SideNavNotifyCount";

const getLinks = (pathname: string) => {
  const list = [
    {
      href: ROUTES.myHome,
      active: pathname === ROUTES.myHome,
      label: "Home",
      icon: (
        <Home
          className={cn(
            pathname === ROUTES.myHome
              ? "[&_path]:fill-secondary [&_polyline]:fill-base-200 [&_polyline]:stroke-base-200"
              : "[&_path]:hover:fill-secondary [&_polyline]:hover:fill-base-200 [&_polyline]:hover:stroke-base-200",
          )}
          size={24}
        />
      ),
    },
    {
      href: ROUTES.notifications,
      active: pathname === ROUTES.notifications,
      label: "Notifications",
      icon: (
        <span className="relative">
          <Bell
            className={cn(
              pathname === ROUTES.notifications
                ? "fill-secondary"
                : "hover:fill-secondary",
            )}
            size={24}
          />
          <SideNavNotifyCount />
        </span>
      ),
    },
    {
      href: ROUTES.favorite,
      active: pathname === ROUTES.favorite,
      label: "Favorite",
      icon: (
        <Heart
          className={cn(
            pathname === ROUTES.favorite
              ? "fill-secondary"
              : "hover:fill-secondary",
          )}
          size={24}
        />
      ),
    },
    {
      href: ROUTES.myPosts,
      active: pathname === ROUTES.myPosts,
      label: "My Posts",
      icon: <FileText size={24} />,
    },
    {
      href: ROUTES.createPost,
      active: pathname === ROUTES.createPost,
      label: "Create Post",
      icon: <FileEdit size={24} />,
    },
  ];

  return list;
};

export default function GeneralLayoutSideNav() {
  const pathname = usePathname();
  const matches = useMediaQuery("(min-width: 1024px)");

  return (
    <aside className="relative hidden min-h-screen w-20 shrink-0 border-r dark:border-base-300 dark:bg-base-200 lg:block">
      <nav className="sticky inset-0 z-10 flex h-screen flex-col items-center justify-between overflow-y-auto py-4 scrollbar-hide">
        <Link
          href={ROUTES.myHome}
          className="flex h-[3.125rem] w-[3.125rem] items-center justify-center"
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
        <ul className="flex w-full flex-col items-center justify-center py-3">
          {getLinks(pathname).map((item) => (
            <SideNavItem
              key={item.label}
              href={item.href}
              active={item.active}
              aria-label={item.label}
            >
              {item.icon}
            </SideNavItem>
          ))}
          <li>
            {matches && (
              <ThemeSwitch
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                tooltipOrigin={{ horizontal: "right", vertical: "bottom" }}
              />
            )}
          </li>
        </ul>
        <UserAvatarButton
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
          hideOnSmallDevice
        />
      </nav>
    </aside>
  );
}
