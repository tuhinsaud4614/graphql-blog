import Link from "next/link";

import { ClientOnly, UserAvatarBtn } from "@/components";
import { LogoIcon } from "@/components/svg";
import { ROUTES } from "@/utils/constants";

const className = {
  root: "bg-base-200 [@supports(backdrop-filter:blur(0px))]:bg-slate-200/50 dark:bg-base-dark-200 dark:[@supports(backdrop-filter:blur(0px))]:bg-base-dark-200/50 backdrop-blur-sm border-b border-secondary dark:border-secondary-dark fixed top-0 left-0 right-0 z-50",
  nav: "max-w-5xl mx-auto h-16 px-5 flex items-center justify-between",
  homeLink: "flex items-center justify-center h-[3.125rem] w-[3.125rem]",
};

interface Props {
  hideAvatar?: boolean;
}

export default function Header({ hideAvatar = false }: Props) {
  return (
    <header className={className.root}>
      <nav className={className.nav}>
        <Link href={ROUTES.myHome} passHref>
          <a className={className.homeLink} aria-label="Home">
            <LogoIcon className="h-[3.125rem] w-[3.125rem]" />
          </a>
        </Link>
        <ClientOnly>
          {!hideAvatar && (
            <UserAvatarBtn
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            />
          )}
        </ClientOnly>
      </nav>
    </header>
  );
}
