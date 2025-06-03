"use client";

import Image from "next/legacy/image";
import Link from "next/link";

import { DemoAvatar } from "@/components";
import { FUserFragment } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { generateFileUrl, getUserName } from "@/lib/utils";

import FollowingItemMore from "./FollowingItemMore";

const className = {
  root: "flex items-center justify-between",
  link: "flex items-center min-w-0 flex-1 group",
  img: "rounded-full w-5 h-5 overflow-hidden border dark:border-none dark:ring-1 dark:group-hover:ring-2 dark:ring-secondary-dark",
  text: "ml-3 text-sm line-clamp-1 text-ellipsis text-neutral dark:text-neutral-dark group-hover:text-accent dark:group-hover:text-accent-dark capitalize",
};

interface Props {
  user: FUserFragment;
}

export default function FollowingItem({ user }: Readonly<Props>) {
  const username = getUserName(user);
  const imgUrl = generateFileUrl(user.avatar?.url);
  return (
    <li className={className.root}>
      <Link
        href={ROUTES.user.userProfile(user.id)}
        aria-label={username}
        className={className.link}
      >
        {imgUrl ? (
          <span className={className.img}>
            <Image
              loader={({ src, width, quality }) =>
                `${src}?w=${width}&q=${quality ?? 75}`
              }
              src={imgUrl}
              alt={username ?? ""}
              width={20}
              height={20}
              objectFit="cover"
              layout="responsive"
            />
          </span>
        ) : (
          <DemoAvatar className="size-5" size={20 / 1.8} />
        )}
        <span className={className.text}>{username}</span>
      </Link>
      <FollowingItemMore user={user} />
    </li>
  );
}
