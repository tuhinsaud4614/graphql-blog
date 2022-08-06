import { useMediaQuery } from "@hooks";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiBell } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { useAuth } from "store";
import { isServer } from "utils";
import { ROUTES } from "utils/constants";

const Theme = dynamic(() => import("components/Theme"), { ssr: false });

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
  const user = useAuth();
  const { pathname } = useRouter();
  const matches = useMediaQuery("(min-width: 1024px)");
  return (
    <header className={className.root}>
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
          {!isServer() && !Boolean(user) && (
            <li>
              <Link href={ROUTES.login} passHref>
                <a className={className.link} aria-label="Sign In">
                  Sign In
                </a>
              </Link>
            </li>
          )}
          <li>
            {!matches && (
              <Theme
                anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
                classes={{ menuRoot: "mt-6" }}
              />
            )}
          </li>
          {!isServer() && user !== null && <Bell />}
          {/* {!isServer() && user !== null && (
            <li>
              <Link href={ROUTES.notifications} passHref>
                <a
                  className={className.notifications}
                  aria-label="Notifications"
                >
                  {pathname === ROUTES.notifications ? (
                    <FaBell size={20} />
                  ) : (
                    <BiBell size={20} />
                  )}
                </a>
              </Link>
            </li>
          )} */}
        </ul>
      </nav>
    </header>
  );
}

function Bell() {
  const { pathname } = useRouter();
  const [state, setState] = useState(false);
  useEffect(() => {
    setState(true);
  }, []);
  if (!state) {
    return null;
  }
  return (
    <li>
      <Link href={ROUTES.notifications} passHref>
        <a className={className.notifications} aria-label="Notifications">
          {pathname === ROUTES.notifications ? (
            <FaBell size={20} />
          ) : (
            <BiBell size={20} />
          )}
        </a>
      </Link>
    </li>
  );
}
