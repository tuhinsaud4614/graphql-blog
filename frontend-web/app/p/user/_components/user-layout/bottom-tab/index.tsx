"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Heart, Home, Search } from "lucide-react";

import { ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import BottomTabAvatar from "./Avatar";

const className = {
  root: "lg:hidden fixed bottom-0 left-0 right-0 h-14 z-40 bg-base-200 [@supports(backdrop-filter:blur(0px))]:bg-slate-200/50 dark:[@supports(backdrop-filter:blur(0px))]:bg-base-200/50 backdrop-blur-sm px-4 shadow-top",
  items: "flex items-center h-full",
  item: "flex-1",
  link: "w-full h-full flex items-center justify-center text-neutral outline-none border-0 active:scale-95",
};

export default function BottomTab() {
  const pathname = usePathname();

  return (
    <nav className={className.root}>
      <ul className={className.items}>
        <li className={className.item}>
          <Link
            href={ROUTES.user.home}
            className={className.link}
            aria-label="Home"
          >
            <Home
              className={cn(
                "transition-all duration-300",
                pathname === ROUTES.user.home
                  ? "text-secondary [&_path]:fill-secondary [&_polyline]:fill-base-200 [&_polyline]:stroke-base-200"
                  : "[&_path]:hover:fill-secondary [&_path]:hover:stroke-secondary [&_polyline]:hover:fill-base-200 [&_polyline]:hover:stroke-base-200",
              )}
              size={24}
            />
          </Link>
        </li>
        <li className={className.item}>
          <Link
            href={ROUTES.search}
            className={className.link}
            aria-label="Search"
          >
            <Search
              className={cn(
                "transition-all duration-300",
                pathname === ROUTES.search
                  ? "font-bold text-secondary"
                  : "font-light hover:text-secondary",
              )}
              size={pathname === ROUTES.search ? 24 : 22}
            />
          </Link>
        </li>
        <li className={className.item}>
          <Link
            href={ROUTES.user.favorite}
            className={className.link}
            aria-label="Favorite"
          >
            <Heart
              className={cn(
                "transition-all duration-300",
                pathname === ROUTES.user.favorite
                  ? "fill-secondary"
                  : "hover:fill-secondary hover:text-secondary",
              )}
              size={24}
            />
          </Link>
        </li>
        <li className={cn(className.item, className.link)}>
          <BottomTabAvatar />
        </li>
      </ul>
    </nav>
  );
}
