import classNames from "classnames";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const className = {
  root: "fixed top-0 left-0 right-0 border-b border-secondary h-16",
  main: "px-4 sm:mx-auto max-w-5xl flex items-center justify-between h-full",
  homeLink: "flex items-center justify-center",
  items: "list-none m-0 flex items-center",
  loginLink: "inline-block cursor-pointer select-none active:scale-95",
};

export default function HomeHeader() {
  const { scrollYProgress } = useViewportScroll();
  const rootBG = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5],
    ["#570DF8", "#570DF8", "#F2F2F2"]
  );
  const linkColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5],
    ["#FFFFFF", "#FFFFFF", "#37CDBE"]
  );

  return (
    <motion.header
      className={classNames(className.root)}
      style={{ backgroundColor: rootBG }}
    >
      <nav className={className.main}>
        <Link href="/" passHref>
          <a className={className.homeLink} aria-label="Home">
            <Image src="/logo.svg" alt="The Rat Diary" height={60} width={60} />
          </a>
        </Link>
        <ul className={className.items}>
          <li>
            <Link href="/account/login" passHref>
              <motion.a
                style={{ color: linkColor }}
                className={className.loginLink}
                aria-label="Sign In"
              >
                Sign In
              </motion.a>
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
