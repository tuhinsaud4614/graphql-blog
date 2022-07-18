import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiBell } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { ROUTES } from "utils/constants";

const className = {
  root: "lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-base-200 shadow-md px-4",
  nav: "flex items-center justify-between",
  homeLink: "flex items-center justify-center h-[3.125rem] w-[3.125rem]",
  notifications:
    "w-9 h-9 flex items-center justify-center rounded-full border border-accent text-accent cursor-pointer select-none active:scale-95",
};

export default function Header() {
  const { pathname } = useRouter();
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
        <Link href={ROUTES.notifications} passHref>
          <a className={className.notifications} aria-label="Notifications">
            {pathname === ROUTES.notifications ? (
              <FaBell size={20} />
            ) : (
              <BiBell size={20} />
            )}
          </a>
        </Link>
      </nav>
    </header>
  );
}
