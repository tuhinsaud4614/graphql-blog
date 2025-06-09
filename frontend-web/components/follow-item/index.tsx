"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import { FUserFragment } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { cn, generateFileUrl, getUserName } from "@/lib/utils";

import DemoAvatar from "../DemoAvatar";
import SlateViewer from "../SlateViewer";
import FollowButton from "./FollowButton";
import UnFollowButton from "./UnFollowButton";

const className = {
  root: "flex dark:ml-0.5 items-start",
  avatar: "h-8 w-8 min-w-0 rounded-full shrink-0 overflow-hidden inline-block",
  mid: "flex flex-col ml-2 mr-4 flex-1",
  title:
    "font-bold text-neutral line-clamp-2 text-ellipsis break-all leading-tight",
  subtitle: "mt-1 text-sm text-neutral/60 line-clamp-2 text-ellipsis",
  btn: "text-sm py-1 px-3",
};

interface Props {
  classes?: {
    root?: string;
    avatar?: string;
    mid?: string;
    title?: string;
    subtitle?: string;
    btn?: string;
  };
  user: FUserFragment;
  followed?: boolean;
}

export default function FollowItem({
  classes,
  user,
  followed = false,
}: Readonly<Props>) {
  const [isFollowed, setFollowed] = React.useState(followed);

  const userName = getUserName(user);
  const imgUrl = generateFileUrl(user.avatar?.url);
  const href = ROUTES.user.userProfile(user.id);
  return (
    <li className={cn(className.root, classes?.root)}>
      {imgUrl ? (
        <Link
          href={href}
          aria-label={userName}
          className={cn(className.avatar, classes?.avatar)}
        >
          <Image
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality || 75}`
            }
            src={imgUrl}
            alt={userName || ""}
            width={32}
            height={32}
            className="size-8 object-cover"
          />
        </Link>
      ) : (
        <DemoAvatar
          as={Link}
          href={href}
          aria-label={userName || ""}
          type="button"
          className="size-8 dark:ml-0.5"
          size={32 / 1.8}
        />
      )}
      <Link
        href={href}
        aria-label={userName}
        className={cn(className.mid, classes?.mid)}
      >
        <h2 className={cn(className.title, classes?.title)}>{userName}</h2>
        {!!user.about && (
          <SlateViewer
            value={JSON.parse(user.about)}
            className="line-clamp-1 [&_*]:!text-muted-foreground"
          />
        )}
      </Link>
      {isFollowed ? (
        <UnFollowButton
          className={cn(className.btn, classes?.btn)}
          onUnFollow={() => setFollowed(false)}
          toId={user.id}
        />
      ) : (
        <FollowButton
          className={cn(className.btn, classes?.btn)}
          onFollow={() => setFollowed(true)}
          toId={user.id}
        />
      )}
    </li>
  );
}
