"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";

import ThemeSwitch from "@/components/theme-switch";
import { ROUTES } from "@/lib/constants";

const className = {
  root: "fixed top-0 left-0 right-0 border-b border-secondary dark:border-secondary-dark h-16 z-50",
  main: "px-4 sm:mx-auto max-w-5xl flex items-center justify-between h-full",
  homeLink: "flex items-center justify-center h-[3.75rem] w-[3.75rem]",
  items: "list-none m-0 flex items-center space-x-3",
  loginLink: "inline-block cursor-pointer select-none active:scale-95",
};

export default function Header() {
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();
  const { scrollY } = useScroll();

  const rootBG = useTransform(
    scrollY,
    [0, 250, 280],
    [
      "hsl(var(--primary))",
      "hsl(var(--primary))",
      resolvedTheme === "dark" ? "#001e3c" : "#F2F2F2",
    ],
  );
  const linkColor = useTransform(
    scrollY,
    [0, 250, 280],
    [
      "hsl(var(--base-100))",
      "hsl(var(--base-100))",
      resolvedTheme === "dark" ? "hsl(var(--accent-100))" : "#37CDBE",
    ],
  );

  return (
    <motion.header
      className={className.root}
      style={{ backgroundColor: rootBG }}
    >
      <nav className={className.main}>
        <Link href="/" className={className.homeLink} aria-label="Home">
          <Image
            src="/logo.svg"
            alt="The Rat Diary"
            height={60}
            width={60}
            layout="fixed"
          />
        </Link>
        <ul className={className.items}>
          <li>
            <Link
              href={pathname === ROUTES.login ? ROUTES.register : ROUTES.login}
              passHref
              legacyBehavior
            >
              <motion.a
                style={{ color: linkColor }}
                className={className.loginLink}
                aria-label={pathname === ROUTES.login ? "Sign Up" : "Sign In"}
              >
                {pathname === ROUTES.login ? "Sign Up" : "Sign In"}
              </motion.a>
            </Link>
          </li>
          <li>
            <ThemeSwitch
              anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            />
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
