import { UserAvatarBtn } from "components";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "utils/constants";

const className = {
  root: "bg-base-200 border-b",
  nav: "max-w-5xl mx-auto h-16 px-5 flex items-center justify-between",
  homeLink: "flex items-center justify-center h-[3.125rem] w-[3.125rem]",
};

export default function Header() {
  return (
    <header className={className.root}>
      <nav className={className.nav}>
        <Link href={ROUTES.myHome} passHref>
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
        <UserAvatarBtn
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        />
      </nav>
    </header>
  );
}
