import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Bell, FileEdit, FileText, Heart, Home } from "lucide-react";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { skeletonVariant } from "@/lib/variants/classVariants";

import SideNavItem from "../SideNavItem";
import SideNavNotifyCount from "../SideNavNotifyCount";
import UserShortProfile from "../UserShortProfile";

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

const getLinks = (pathname: string) => {
  const list = [
    {
      href: ROUTES.user.home,
      active: pathname === ROUTES.user.home,
      label: "Home",
      icon: (
        <Home
          className={cn(
            pathname === ROUTES.user.home
              ? "[&_path]:fill-secondary [&_polyline]:fill-base-200 [&_polyline]:stroke-base-200"
              : "[&_path]:hover:fill-secondary [&_polyline]:hover:fill-base-200 [&_polyline]:hover:stroke-base-200",
          )}
          size={24}
        />
      ),
    },
    {
      href: ROUTES.user.notifications,
      active: pathname === ROUTES.user.notifications,
      label: "Notifications",
      icon: (
        <span className="relative">
          <Bell
            className={cn(
              pathname === ROUTES.user.notifications
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
      href: ROUTES.user.favorite,
      active: pathname === ROUTES.user.favorite,
      label: "Favorite",
      icon: (
        <Heart
          className={cn(
            pathname === ROUTES.user.favorite
              ? "fill-secondary"
              : "hover:fill-secondary",
          )}
          size={24}
        />
      ),
    },
    {
      href: ROUTES.user.posts,
      active: pathname === ROUTES.user.posts,
      label: "My Posts",
      icon: <FileText size={24} />,
    },
    {
      href: ROUTES.user.postCreate,
      active: pathname === ROUTES.user.postCreate,
      label: "Create Post",
      icon: <FileEdit size={24} />,
    },
  ];

  return list;
};

export default function UserSideNav() {
  const pathname = usePathname();

  return (
    <aside className="relative hidden min-h-screen w-20 shrink-0 border-r dark:border-base-300 dark:bg-base-200 lg:block">
      <nav className="sticky inset-0 z-10 flex h-screen flex-col items-center justify-between overflow-y-auto py-4 scrollbar-hide">
        <Link
          href={ROUTES.user.home}
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
          <ThemeButton />
        </ul>
        <UserShortProfile />
      </nav>
    </aside>
  );
}
