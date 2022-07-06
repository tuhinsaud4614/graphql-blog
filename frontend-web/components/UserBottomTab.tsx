import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { HiHome, HiOutlineHome } from "react-icons/hi";

const className = {
  root: "lg:hidden fixed bottom-0 left-0 right-0 h-14 bg-base-200 px-4 shadow-top",
  items: " flex items-center h-full",
  item: "flex-1",
  link: "w-full h-full flex items-center justify-center text-neutral outline-none border-0 active:scale-95",
  avatar: "w-7 h-7 rounded-full",
};

export default function UserBottomTab() {
  const { pathname } = useRouter();
  console.log(pathname);

  return (
    <nav className={className.root}>
      <ul className={className.items}>
        <li className={className.item}>
          <Link href="/" passHref>
            <a className={className.link}>
              {pathname === "/my-home" ? (
                <HiHome size={24} />
              ) : (
                <HiOutlineHome size={24} />
              )}
            </a>
          </Link>
        </li>
        <li className={className.item}>
          <Link href="/search" passHref>
            <a className={className.link}>
              <FiSearch
                className={
                  pathname === "/search"
                    ? "text-neutral-focus font-bold"
                    : "font-light"
                }
                size={pathname === "/search" ? 24 : 22}
              />
            </a>
          </Link>
        </li>
        <li className={className.item}>
          <Link href="/favorite" passHref>
            <a className={className.link}>
              {pathname === "/favorite" ? (
                <AiFillHeart size={24} />
              ) : (
                <AiOutlineHeart size={24} />
              )}
            </a>
          </Link>
        </li>
        <li className={className.item}>
          <button aria-label="About me" className={className.link}>
            <span className={className.avatar}>
              <Image
                src="/demo.png"
                alt="Avatar"
                width={28}
                height={28}
                objectFit="cover"
                layout="responsive"
                className="rounded-full"
              />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
