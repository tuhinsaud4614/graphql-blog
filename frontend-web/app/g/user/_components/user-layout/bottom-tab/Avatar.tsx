"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import { Bell, FileText, Settings } from "lucide-react";
import { useSession } from "next-auth/react";

import DemoAvatar from "@/components/DemoAvatar";
import NavAvatar from "@/components/NavAvatar";
import Modal from "@/components/modal";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ROUTES } from "@/lib/constants";
import { generateFileUrl, getUserName } from "@/lib/utils";
import { skeletonVariant } from "@/lib/variants/classVariants";

import BottomTabLogout from "./Logout";

export default function BottomTabAvatar() {
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery("(min-width: 1024px)");

  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (matches) {
      setOpen(false);
    }
  }, [matches]);

  if (status === "loading") {
    return (
      <span
        className={skeletonVariant({
          className: "h-9 w-9",
          shape: "circle",
        })}
      />
    );
  }

  if (!session?.user) {
    return (
      <DemoAvatar
        as="button"
        aria-label="Demo avatar"
        type="button"
        className="h-7 w-7"
        size={28 / 1.8}
      />
    );
  }
  const imgUrl = generateFileUrl(session.user.avatar?.url);
  const username = getUserName(session.user);
  return (
    <>
      {imgUrl ? (
        <NavAvatar
          btnProps={{
            type: "button",
            "aria-label": username,
            onClick() {
              setOpen((prev) => !prev);
            },
            className: "w-7 h-7",
          }}
          loader={({ src, width, quality }) =>
            `${src}?w=${width}&q=${quality || 75}`
          }
          src={imgUrl}
          alt="Avatar"
          size={28}
        />
      ) : (
        <DemoAvatar
          as="button"
          aria-label={username}
          type="button"
          className="h-7 w-7"
          size={28 / 1.8}
          onClick={() => setOpen((prev) => !prev)}
        />
      )}
      <Modal
        open={open}
        onHide={() => setOpen(false)}
        locked
        classes={{ container: "py-4" }}
      >
        <Link
          href={ROUTES.user.userProfile(session.user.id)}
          className="group flex px-4 py-2 active:scale-95"
        >
          {imgUrl ? (
            <span
              aria-label={username}
              className="mr-3 inline-block h-8 w-8 overflow-hidden rounded-full dark:ring-1 dark:ring-secondary dark:group-hover:ring-2"
            >
              <Image
                loader={({ src, width, quality }) =>
                  `${src}?w=${width}&q=${quality || 75}`
                }
                src={imgUrl}
                alt={username || ""}
                width={32}
                height={32}
                className="object-fit"
              />
            </span>
          ) : (
            <DemoAvatar
              className="mr-3 h-8 w-8 dark:ml-1 dark:mt-1"
              size={32 / 1.8}
            />
          )}
          <div className="flex flex-col">
            <p className="line-clamp-1 text-ellipsis pb-1 text-neutral group-hover:text-accent">
              {username}
            </p>
            <span className="line-clamp-1 text-ellipsis text-sm text-neutral/60 group-hover:text-accent">
              {session.user.email}
            </span>
          </div>
        </Link>
        <hr className="dark:border-base-dark-300 my-2 border-b" />
        <ul className="m-0 flex list-none flex-col">
          <li>
            <Link
              href={ROUTES.user.notifications}
              aria-label="Notifications"
              className="flex w-full items-center border-none px-4 py-2 text-neutral outline-none hover:bg-base-200 hover:text-accent dark:hover:text-base-300"
            >
              <Bell size={20} />
              <span className="ml-2">Notifications</span>
            </Link>
          </li>
          <li>
            <Link
              href={ROUTES.user.posts}
              aria-label="My Posts"
              className="flex w-full items-center border-none px-4 py-2 text-neutral outline-none hover:bg-base-200 hover:text-accent dark:hover:text-base-300"
            >
              <FileText size={24} />
              <span className="ml-2">My Posts</span>
            </Link>
          </li>
        </ul>
        <hr className="dark:border-base-dark-300 my-2 border-b" />
        <ul className="m-0 flex list-none flex-col">
          <li>
            <Link
              href={ROUTES.user.settings}
              aria-label="Settings"
              className="flex w-full items-center border-none px-4 py-2 text-neutral outline-none hover:bg-base-200 hover:text-accent dark:hover:text-base-300"
            >
              <Settings size={20} />
              <span className="ml-2">Settings</span>
            </Link>
          </li>
          <BottomTabLogout onClose={() => setOpen(false)} />
        </ul>
      </Modal>
    </>
  );
}
