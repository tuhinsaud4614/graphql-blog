"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";

import AuthSwitch from "@/components/AuthSwitch";
import UserAvatarButton from "@/components/user-avatar-button";
import { ROUTES } from "@/lib/constants";
import { skeletonVariant } from "@/lib/variants/classVariants";

const ThemeSwitch = dynamic(() => import("@/components/theme-switch"), {
  ssr: false,
  loading: () => (
    <span
      className={skeletonVariant({
        className: "h-9 w-9",
        shape: "circle",
      })}
    />
  ),
});

export default function LandingHeader() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

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
      className="fixed inset-x-0 top-0 z-50 h-16 border-b border-secondary"
      style={{ backgroundColor: rootBG }}
    >
      <nav className="flex h-full max-w-5xl items-center justify-between px-4 sm:mx-auto">
        <Link
          href={ROUTES.landing}
          className="flex size-[3.75rem] items-center justify-center"
          aria-label="Home"
        >
          <Image src="/logo.svg" alt="The Rat Diary" height={60} width={60} />
        </Link>
        <ul className="m-0 flex list-none items-center space-x-3">
          <AuthSwitch
            auth={(user) => (
              <li>
                <UserAvatarButton
                  user={user}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                />
              </li>
            )}
            unAuth={
              <li>
                <Link
                  href={
                    pathname === ROUTES.account.login
                      ? ROUTES.account.register
                      : ROUTES.account.login
                  }
                  passHref
                  legacyBehavior
                >
                  <motion.a
                    style={{ color: linkColor }}
                    className="inline-block cursor-pointer select-none active:scale-95"
                    aria-label={
                      pathname === ROUTES.account.login ? "Sign Up" : "Sign In"
                    }
                  >
                    {pathname === ROUTES.account.login ? "Sign Up" : "Sign In"}
                  </motion.a>
                </Link>
              </li>
            }
            loader={
              <span
                className={skeletonVariant({
                  className: "h-6 w-12",
                  variant: "base-100",
                  shape: "round",
                })}
              />
            }
          />
          <li>
            <ThemeSwitch
              variant="secondary"
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              tooltipOrigin={{ horizontal: "right" }}
            />
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
