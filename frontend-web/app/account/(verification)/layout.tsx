"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import UserShortProfile from "@/components/UserShortProfile";
import { ROUTES } from "@/lib/constants";

interface Props {
  children: React.ReactNode;
}

export default function VerificationLayout({ children }: Props) {
  const pathname = usePathname();
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-secondary bg-base-200 backdrop-blur-sm [@supports(backdrop-filter:blur(0px))]:bg-slate-200/50 dark:[@supports(backdrop-filter:blur(0px))]:bg-base-200/50">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link
            href={
              pathname === ROUTES.account.verifyPasswordReset
                ? ROUTES.user.home
                : ROUTES.landing
            }
            className="flex h-[3.75rem] w-[3.75rem] items-center justify-center"
            aria-label="Home"
          >
            <Image
              src="/logo.svg"
              alt="The Rat Diary"
              height={60}
              width={60}
              priority
            />
          </Link>
          {pathname === ROUTES.account.verifyPasswordReset && (
            <UserShortProfile />
          )}
        </nav>
      </header>
      <main className="mx-auto mt-[calc(4rem+1px)] max-w-3xl overflow-y-auto p-5">
        {children}
      </main>
    </>
  );
}
