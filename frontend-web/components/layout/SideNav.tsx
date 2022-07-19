import { useMediaQuery } from "@hooks";
import classNames from "classnames";
import { Menu } from "components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiBell, BiEdit, BiExit } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { CgLoadbarDoc } from "react-icons/cg";
import { FaBell } from "react-icons/fa";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import { ROUTES } from "utils/constants";

const className = {
  root: "hidden lg:block min-h-screen w-20 border-r relative",
  nav: "h-screen sticky inset-0 z-10 flex flex-col justify-between items-center py-4",
  homeLink: "flex items-center justify-center h-[3.125rem] w-[3.125rem]",
  items: "w-full flex flex-col justify-center items-center",
  item: "w-full pb-8",
  link: "w-full flex items-center justify-center text-neutral active:scale-95",
  avatar: "w-9 h-9 rounded-full overflow-hidden active:scale-95",
  avatarMenu: "w-60 py-2",
  avatarMenuItems: "list-none m-0 flex flex-col",
  avatarMenuLink:
    "w-full outline-none border-none flex items-center px-4 py-2 text-sm hover:bg-base-200 text-neutral hover:text-accent active:scale-95",
  avatarInfo: "flex px-4 hover:bg-base-200 py-2 group",
  avatarInfoImg: "w-8 h-8 inline-block rounded-full overflow-hidden mr-3",
  avatarInfoDetail: "flex flex-col",
};

export default function SideNav() {
  const { pathname } = useRouter();

  return (
    <aside className={className.root}>
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
        <ul className={className.items}>
          <li className={className.item}>
            <Link href="/my-home" passHref>
              <a
                aria-label="Home"
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
                aria-label="Notifications"
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
                aria-label="Favorite"
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
            <Link href={ROUTES.myPosts} passHref>
              <a
                aria-label="My posts"
                className={classNames(
                  className.link,
                  pathname === ROUTES.myPosts && "!text-secondary"
                )}
              >
                <CgLoadbarDoc size={24} />
              </a>
            </Link>
          </li>
          <li className={className.item}>
            <Link href={ROUTES.createPost} passHref>
              <a
                aria-label="Create post"
                className={classNames(
                  className.link,
                  pathname === ROUTES.createPost && "!text-secondary"
                )}
              >
                <BiEdit size={24} />
              </a>
            </Link>
          </li>
        </ul>
        <Avatar />
      </nav>
    </aside>
  );
}

function Avatar() {
  const [anchorEle, setAnchorEle] = useState<null | HTMLButtonElement>(null);

  const matches = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (!matches) {
      setAnchorEle(null);
    }
  }, [matches]);

  return (
    <Fragment>
      <button
        aria-label="About me"
        className={className.avatar}
        type="button"
        onClick={(e) => setAnchorEle(e.currentTarget)}
      >
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
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <div className={className.avatarMenu}>
          <ul className={className.avatarMenuItems}>
            <li>
              <button
                type="button"
                aria-label="Logout"
                className={className.avatarMenuLink}
              >
                <BiExit size={18} />
                <span className="ml-2">Logout</span>
              </button>
            </li>
            <li>
              <Link href={ROUTES.accountSettings} passHref>
                <a aria-label="Settings" className={className.avatarMenuLink}>
                  <BsFillGearFill size={18} />
                  <span className="ml-2">Settings</span>
                </a>
              </Link>
            </li>
          </ul>
          <hr className="border-t my-2" />
          <Link href={ROUTES.authorProfile("1")} passHref>
            <a className={className.avatarInfo}>
              <span aria-label="Avatar" className={className.avatarInfoImg}>
                <Image
                  src="/demo.png"
                  alt="Avatar"
                  width={32}
                  height={32}
                  layout="responsive"
                  objectFit="cover"
                />
              </span>
              <div className={className.avatarInfoDetail}>
                <p className="pb-1 text-sm line-clamp-1 text-ellipsis text-neutral group-hover:text-accent">
                  Nothing name
                </p>
                <span className="text-xs line-clamp-1 text-ellipsis text-neutral/60 group-hover:text-accent">
                  Nothing name
                </span>
              </div>
            </a>
          </Link>
        </div>
      </Menu>
    </Fragment>
  );
}
