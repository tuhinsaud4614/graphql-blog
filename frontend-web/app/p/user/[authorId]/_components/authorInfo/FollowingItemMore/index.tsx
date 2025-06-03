"use client";

import * as React from "react";

import Image from "next/legacy/image";
import Link from "next/link";

import { MoreHorizontalIcon } from "lucide-react";
import { Descendant } from "slate";

import { DemoAvatar, Menu } from "@/components";
import { FUserFragment } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import {
  generateFileUrl,
  getUserName,
  serializeOnlyTextSlateValue,
} from "@/lib/utils";

import { Bottom } from "./Bottom";

const className = {
  actions:
    "h-8 w-8 outline-none border-none scale-95 flex items-center justify-center text-neutral dark:text-neutral-dark dark:hover:text-neutral hover:bg-accent dark:hover:bg-accent-dark active:bg-accent-focus dark:active:bg-accent active:scale-95 rounded-full",
  menuContainer: "w-[18.75rem] p-4 flex flex-col",
  menuHead: "flex items-center group",
  menuHeadImg:
    "rounded-full w-8 h-8 overflow-hidden border dark:border-none dark:ring-1 dark:group-hover:ring-2 dark:ring-secondary-dark",
  menuHeadText:
    "ml-3 text-xl font-medium line-clamp-1 text-ellipsis text-neutral dark:text-neutral-dark group-hover:text-accent dark:group-hover:text-accent-dark capitalize",
  menuBody: "py-3 text-sm text-neutral dark:text-neutral-dark",
};

interface Props {
  user: FUserFragment;
}

export default function FollowingItemMore({ user }: Readonly<Props>) {
  const [anchorEle, setAnchorEle] = React.useState<null | HTMLButtonElement>(
    null,
  );

  const username = getUserName(user);
  const imgUrl = generateFileUrl(user.avatar?.url);
  const { about } = user;
  const aboutText = React.useMemo(
    () =>
      about
        ? serializeOnlyTextSlateValue(JSON.parse(about) as Descendant[])
        : null,
    [about],
  );

  return (
    <React.Fragment>
      <button
        aria-label="More actions"
        type="button"
        className={className.actions}
        onClick={(e) => setAnchorEle(e.currentTarget)}
      >
        <MoreHorizontalIcon size={20} />
      </button>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <div className={className.menuContainer}>
          <Link
            href={ROUTES.user.userProfile(user.id)}
            aria-label={username}
            className={className.menuHead}
          >
            {imgUrl ? (
              <span className={className.menuHeadImg}>
                <Image
                  loader={({ src, width, quality }) =>
                    `${src}?w=${width}&q=${quality ?? 75}`
                  }
                  src={imgUrl}
                  alt={username ?? ""}
                  width={32}
                  height={32}
                  objectFit="cover"
                  layout="responsive"
                />
              </span>
            ) : (
              <DemoAvatar className="size-8" size={32 / 1.8} />
            )}
            <span className={className.menuHeadText}>{username}</span>
          </Link>
          <div className={className.menuBody}>{aboutText}</div>
          <Bottom id={user.id} />
        </div>
      </Menu>
    </React.Fragment>
  );
}
