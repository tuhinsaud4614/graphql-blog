"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import { Descendant } from "slate";

import { DemoAvatar } from "@/components";
import {
  FUserFragment,
  useUserMentionTooltipStatsQuery,
} from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import {
  cn,
  generateFileUrl,
  getUserName,
  serializeOnlyTextSlateValue,
} from "@/lib/utils";

import ReactorItemAction from "./ReactorItemAction";

const className = {
  userTile: "flex items-center justify-between",
  userTileLeft: "flex items-start min-w-0 flex-1",
  userTileAuthorName:
    "font-medium text-sm text-neutral dark:text-neutral-dark hover:text-accent active:scale-95 line-clamp-1 text-ellipsis w-max",
  userTileAuthorAbout:
    "text-xs text-neutral/60 dark:text-neutral-dark/60 line-clamp-1 text-ellipsis mt-1",
  userTileImg:
    "size-10 inline-block rounded-full overflow-hidden border dark:border-none dark:ring-1 dark:ring-secondary-dark",
  skeltonCommon:
    "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20 rounded-full",
  skeletonText: "w-16 h-6",
  skeletonBtn: "w-24 h-8 mt-3",
};

interface Props {
  user: FUserFragment;
}

export default function ReactorItem({ user }: Readonly<Props>) {
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

  const { data, loading, error } = useUserMentionTooltipStatsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: { id: user.id },
  });

  return (
    <li className={className.userTile}>
      <div className={className.userTileLeft}>
        {imgUrl ? (
          <span className={className.userTileImg}>
            <Image
              loader={({ src, width, quality }) =>
                `${src}?w=${width}&q=${quality ?? 75}`
              }
              src={imgUrl}
              alt={username ?? ""}
              width={0}
              height={0}
              className="size-10 object-cover"
            />
          </span>
        ) : (
          <DemoAvatar className="size-10" size={40 / 1.8} />
        )}
        <span className="flex min-w-0 flex-1 flex-col px-3">
          <Link
            href={ROUTES.user.userProfile(user.id)}
            aria-label={username}
            className={className.userTileAuthorName}
          >
            {username}
          </Link>
          {aboutText && (
            <p className={className.userTileAuthorAbout}>{aboutText}</p>
          )}
        </span>
      </div>
      {loading || error || !data ? (
        <span className={cn(className.skeltonCommon, className.skeletonBtn)} />
      ) : (
        <ReactorItemAction
          userId={user.id}
          isFollowed={data.userResult.hasFollow}
        />
      )}
    </li>
  );
}
