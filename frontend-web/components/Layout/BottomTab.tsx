import { useMediaQuery } from "@hooks";
import classNames from "classnames";
import { Modal, NavAvatar } from "components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiBell, BiExit } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { CgLoadbarDoc } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { HiHome, HiOutlineHome } from "react-icons/hi";
import { ROUTES } from "utils/constants";

const className = {
  root: "lg:hidden fixed bottom-0 left-0 right-0 h-14 z-40 bg-base-200 [@supports(backdrop-filter:blur(0px))]:bg-slate-200/50 dark:bg-base-dark-200 dark:[@supports(backdrop-filter:blur(0px))]:bg-base-dark-200/50 backdrop-blur-sm px-4 shadow-top",
  items: "flex items-center h-full",
  item: "flex-1",
  link: "w-full h-full flex items-center justify-center text-neutral dark:text-neutral-dark outline-none border-0 active:scale-95",
  avatar: "w-7 h-7",
  avatarInfo: "flex px-4 py-2 group active:scale-95",
  avatarInfoImg:
    "w-8 h-8 inline-block rounded-full overflow-hidden mr-3 dark:ring-1 dark:group-hover:ring-2 dark:ring-secondary-dark",
  avatarInfoDetail: "flex flex-col",
  avatarMenuItems: "list-none m-0 flex flex-col",
  avatarMenuLink:
    "w-full outline-none border-none flex items-center px-4 py-2 hover:bg-base-200 dark:hover:bg-base-dark-200 text-neutral dark:text-neutral-dark hover:text-accent dark:hover:text-base-dark-300",
  name: "pb-1 line-clamp-1 text-ellipsis text-neutral dark:text-neutral-dark dark:group-hover:text-accent-dark",
  bio: "text-sm line-clamp-1 text-ellipsis text-neutral/60 dark:text-neutral-dark/60 group-hover:text-accent dark:group-hover:text-accent-dark",
};

export default function BottomTab() {
  const { pathname } = useRouter();

  return (
    <nav className={className.root}>
      <ul className={className.items}>
        <li className={className.item}>
          <Link href="/my-home" passHref>
            <a className={className.link} aria-label="Home">
              {pathname === "/my-home" ? (
                <HiHome
                  size={24}
                  className="text-secondary dark:!text-secondary-dark"
                />
              ) : (
                <HiOutlineHome size={24} />
              )}
            </a>
          </Link>
        </li>
        <li className={className.item}>
          <Link href={ROUTES.search} passHref>
            <a className={className.link} aria-label="Search">
              <FiSearch
                className={
                  pathname === ROUTES.search
                    ? "text-secondary dark:!text-secondary-dark font-bold"
                    : "font-light"
                }
                size={pathname === ROUTES.search ? 24 : 22}
              />
            </a>
          </Link>
        </li>
        <li className={className.item}>
          <Link href={ROUTES.favorite} passHref>
            <a className={className.link} aria-label="Favorite">
              {pathname === ROUTES.favorite ? (
                <AiFillHeart
                  size={24}
                  className="text-secondary dark:!text-secondary-dark"
                />
              ) : (
                <AiOutlineHeart size={24} />
              )}
            </a>
          </Link>
        </li>
        <li className={classNames(className.item, className.link)}>
          <Avatar />
        </li>
      </ul>
    </nav>
  );
}

function Avatar() {
  const [open, setOpen] = useState(false);

  const matches = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (matches) {
      setOpen(false);
    }
  }, [matches]);

  return (
    <Fragment>
      <NavAvatar
        aria-label="About me"
        onClick={() => setOpen((prev) => !prev)}
        src="/demo.png"
        alt="Avatar"
        size={28}
        className={className.avatar}
      />
      <Modal
        open={open}
        onHide={() => setOpen(false)}
        locked
        classes={{ container: "py-4" }}
      >
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
              <p className={className.name}>Nothing name</p>
              <span className={className.bio}>Nothing name</span>
            </div>
          </a>
        </Link>
        <hr className="my-2 border-b dark:border-base-dark-300" />
        <ul className={className.avatarMenuItems}>
          <li>
            <Link href={ROUTES.notifications} passHref>
              <a
                aria-label="Notifications"
                className={className.avatarMenuLink}
              >
                <BiBell size={20} />
                <span className="ml-2">Notifications</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href={ROUTES.myPosts} passHref>
              <a aria-label="My Posts" className={className.avatarMenuLink}>
                <CgLoadbarDoc size={24} />
                <span className="ml-2">My Posts</span>
              </a>
            </Link>
          </li>
        </ul>
        <hr className="my-2 border-b dark:border-base-dark-300" />
        <ul className={className.avatarMenuItems}>
          <li>
            <Link href={ROUTES.accountSettings} passHref>
              <a aria-label="Settings" className={className.avatarMenuLink}>
                <BsFillGearFill size={20} />
                <span className="ml-2">Settings</span>
              </a>
            </Link>
          </li>
          <li>
            <button
              type="button"
              aria-label="Logout"
              className={className.avatarMenuLink}
            >
              <BiExit size={20} />
              <span className="ml-2">Logout</span>
            </button>
          </li>
        </ul>
      </Modal>
    </Fragment>
  );
}
