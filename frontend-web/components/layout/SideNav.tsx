import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiBell, BiEdit } from "react-icons/bi";
import { CgLoadbarDoc } from "react-icons/cg";
import { FaBell } from "react-icons/fa";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import { ROUTES } from "utils/constants";

const className = {
  root: "hidden lg:block min-h-screen w-20 border-r relative",
  nav: "h-screen sticky inset-0 z-10 flex flex-col justify-between items-center py-4",
  homeLink: "flex items-center justify-center",
  items: "w-full flex flex-col justify-center items-center",
  item: "w-full pb-8",
  link: "w-full flex items-center justify-center text-neutral active:scale-95",
  avatar: "w-9 h-9 rounded-full overflow-hidden active:scale-95",
};

export default function SideNav() {
  const { pathname } = useRouter();

  return (
    <aside className={className.root}>
      <nav className={className.nav}>
        <Link href="/" passHref>
          <a className={className.homeLink} aria-label="Home">
            <Image src="/logo.svg" alt="The Rat Diary" height={50} width={50} />
          </a>
        </Link>
        <ul className={className.items}>
          <li className={className.item}>
            <Link href="/my-home" passHref>
              <a
                className={classNames(
                  className.link,
                  pathname === "/my-home" && "!text-secondary"
                )}
              >
                {pathname === "/my-home" ? (
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
                className={classNames(
                  className.link,
                  pathname === ROUTES.notifications && "!text-secondary"
                )}
              >
                {pathname === ROUTES.notifications ? (
                  <FaBell size={24} />
                ) : (
                  <BiBell size={24} />
                )}
              </a>
            </Link>
          </li>
          <li className={className.item}>
            <Link href={ROUTES.favorite} passHref>
              <a
                className={classNames(
                  className.link,
                  pathname === ROUTES.favorite && "!text-secondary"
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
            <Link href="/posts/me" passHref>
              <a
                className={classNames(
                  className.link,
                  pathname === "/posts/me" && "!text-secondary"
                )}
              >
                <CgLoadbarDoc size={24} />
              </a>
            </Link>
          </li>
          <li className={className.item}>
            <Link href="/posts/create" passHref>
              <a
                className={classNames(
                  className.link,
                  pathname === "/posts/create" && "!text-secondary"
                )}
              >
                <BiEdit size={24} />
              </a>
            </Link>
          </li>
        </ul>

        <button aria-label="About me" className={className.avatar}>
          <Image
            src="/demo.png"
            alt="Avatar"
            width={32}
            height={32}
            objectFit="cover"
            layout="responsive"
            className="rounded-full"
          />
        </button>
      </nav>
    </aside>
  );
}
