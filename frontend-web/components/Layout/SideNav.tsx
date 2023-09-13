import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiBell, BiEdit } from "react-icons/bi";
import { CgLoadbarDoc } from "react-icons/cg";
import { FaBell } from "react-icons/fa";
import { HiHome, HiOutlineHome } from "react-icons/hi";

import { Badge, ClientOnly, UserAvatarBtn } from "@/components";
import { selectNotificationUnSeenCount, selectUser } from "@/features";
import { useMediaQuery } from "@/hooks";
import { useAppSelector } from "@/store";
import { cn } from "@/utils";
import { ROUTES } from "@/utils/constants";

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
  const { pathname } = useRouter();
  const matches = useMediaQuery("(min-width: 1024px)");

  return (
    <aside className={className.root}>
      <nav className={className.nav}>
        <Link href="/" passHref>
          <a className={className.homeLink} aria-label="Home">
            <Image
              src="/logo.svg"
              alt="The Rat Diary"
              height={50}
              width={50}
              layout="fixed"
            />
          </a>
        </Link>
        <ul className={className.items}>
          <li className={className.item}>
            <Link href={ROUTES.myHome} passHref>
              <a
                aria-label="Home"
                className={cn(
                  className.link,
                  pathname === ROUTES.myHome &&
                    "!text-secondary dark:!text-secondary-dark",
                )}
              >
                {pathname === ROUTES.myHome ? (
                  <HiHome size={24} />
                ) : (
                  <HiOutlineHome size={24} />
                )}
              </a>
            </Link>
          </li>
          <li className={className.item}>
            <Link href={ROUTES.notifications} passHref>
              <a
                aria-label="Notifications"
                className={cn(
                  className.link,
                  pathname === ROUTES.notifications &&
                    "!text-secondary dark:!text-secondary-dark",
                )}
              >
                <span className="relative">
                  {pathname === ROUTES.notifications ? (
                    <FaBell size={24} />
                  ) : (
                    <BiBell size={24} />
                  )}
                  <ClientOnly>
                    <NotifyCount />
                  </ClientOnly>
                </span>
              </a>
            </Link>
          </li>
          <li className={className.item}>
            <Link href={ROUTES.favorite} passHref>
              <a
                aria-label="Favorite"
                className={cn(
                  className.link,
                  pathname === ROUTES.favorite &&
                    "!text-secondary dark:!text-secondary-dark",
                )}
              >
                {pathname === ROUTES.favorite ? (
                  <AiFillHeart size={24} />
                ) : (
                  <AiOutlineHeart size={24} />
                )}
              </a>
            </Link>
          </li>
          <li className={className.item}>
            <Link href={ROUTES.myPosts} passHref>
              <a
                aria-label="My posts"
                className={cn(
                  className.link,
                  pathname === ROUTES.myPosts &&
                    "!text-secondary dark:!text-secondary-dark",
                )}
              >
                <CgLoadbarDoc size={24} />
              </a>
            </Link>
          </li>
          <li className={className.item}>
            <Link href={ROUTES.createPost} passHref>
              <a
                aria-label="Create post"
                className={cn(
                  className.link,
                  pathname === ROUTES.createPost &&
                    "!text-secondary dark:!text-secondary-dark",
                )}
              >
                <BiEdit size={24} />
              </a>
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
  const count = useAppSelector(selectNotificationUnSeenCount);
  const user = useAppSelector(selectUser);

  return user && !!count ? (
    <Badge variant="secondary">{count >= 100 ? "99+" : count}</Badge>
  ) : null;
}
