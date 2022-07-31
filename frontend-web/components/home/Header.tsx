import { useMediaQuery } from "@hooks";
import classNames from "classnames";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTES } from "utils/constants";

const Theme = dynamic(() => import("components/Theme"), { ssr: false });

const className = {
  root: "fixed top-0 left-0 right-0 border-b border-secondary dark:border-secondary-dark h-16 z-50",
  main: "px-4 sm:mx-auto max-w-5xl flex items-center justify-between h-full",
  homeLink: "flex items-center justify-center h-[3.75rem] w-[3.75rem]",
  items: "list-none m-0 flex items-center space-x-3",
  loginLink: "inline-block cursor-pointer select-none active:scale-95",
};

export default function Header() {
  const router = useRouter();
  const { scrollY } = useViewportScroll();
  const matches = useMediaQuery("(prefers-color-scheme: dark)");
  const rootBG = useTransform(
    scrollY,
    [0, 250, 280],
    ["#570DF8", "#570DF8", matches ? "#001e3c" : "#F2F2F2"]
  );
  const linkColor = useTransform(
    scrollY,
    [0, 250, 280],
    ["#FFFFFF", "#FFFFFF", matches ? "#84d6a1" : "#37CDBE"]
  );

  return (
    <motion.header
      className={classNames(className.root)}
      style={{ backgroundColor: rootBG }}
    >
      <nav className={className.main}>
        <Link href="/" passHref>
          <a className={className.homeLink} aria-label="Home">
            <Image
              src="/logo.svg"
              alt="The Rat Diary"
              height={60}
              width={60}
              layout="fixed"
            />
          </a>
        </Link>
        <ul className={className.items}>
          <li>
            <Link
              href={
                router.pathname === ROUTES.login
                  ? ROUTES.register
                  : ROUTES.login
              }
              passHref
            >
              <motion.a
                style={{ color: linkColor }}
                className={className.loginLink}
                aria-label={
                  router.pathname === ROUTES.login ? "Sign Up" : "Sign In"
                }
              >
                {router.pathname === ROUTES.login ? "Sign Up" : "Sign In"}
              </motion.a>
            </Link>
          </li>
          <li>
            <Theme anchorOrigin={{ horizontal: "right", vertical: "bottom" }} />
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
