import classNames from "classnames";
import { DemoAvatar } from "components";
import {
  FUserFragment,
  useUserMentionTooltipStatsQuery,
} from "graphql/generated/schema";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { Descendant } from "slate";
import { generateFileUrl, getUserName, serializeSlateValue } from "utils";
import { ROUTES } from "utils/constants";
import ReactorItemAction from "./ReactorItemAction";

const className = {
  userTile: "flex items-center justify-between",
  userTileLeft: "flex items-start min-w-0 flex-1",
  userTileAuthorName:
    "font-medium text-sm text-neutral dark:text-neutral-dark hover:text-neutral-focus dark:hover:text-neutral-dark-focus active:scale-95 line-clamp-1 text-ellipsis",
  userTileAuthorAbout:
    "text-xs text-neutral/60 dark:text-neutral-dark/60 line-clamp-1 text-ellipsis mt-1",
  userTileImg:
    "w-10 h-10 inline-block rounded-full overflow-hidden mr-5 border dark:border-none dark:ring-1 dark:ring-secondary-dark",
  skeltonCommon:
    "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20 rounded-full",
  skeletonText: "w-16 h-6",
  skeletonBtn: "w-24 h-8 mt-3",
};

interface Props {
  user: FUserFragment;
}

export default function ReactorItem({ user }: Props) {
  const username = getUserName(user);
  const imgUrl = generateFileUrl(user.avatar?.url);
  const { about } = user;
  const aboutText = useMemo(
    () =>
      about ? serializeSlateValue(JSON.parse(about) as Descendant[]) : null,
    [about]
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
                `${src}?w=${width}&q=${quality || 75}`
              }
              src={imgUrl}
              alt={username}
              width={40}
              height={40}
              layout="responsive"
              objectFit="cover"
            />
          </span>
        ) : (
          <DemoAvatar className="w-10 h-10" size={40 / 1.8} />
        )}
        <span className="flex flex-col min-w-0 flex-1 pr-3">
          <Link href={ROUTES.authorProfile(user.id)} passHref>
            <a aria-label={username} className={className.userTileAuthorName}>
              {username}
            </a>
          </Link>
          {aboutText && (
            <p className={className.userTileAuthorAbout}>{aboutText}</p>
          )}
        </span>
      </div>
      {loading || error || !data ? (
        <span
          className={classNames(className.skeltonCommon, className.skeletonBtn)}
        />
      ) : (
        <ReactorItemAction
          userId={user.id}
          isFollowed={data.userResult.hasFollow}
        />
      )}
    </li>
  );
}
