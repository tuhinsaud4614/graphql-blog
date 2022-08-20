import { DemoAvatar } from "components";
import { FUserFragment } from "graphql/generated/schema";
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
    "w-10 h-10 inline-block rounded-full overflow-hidden mr-5 border p-0.5 dark:p-0 dark:border-none dark:ring-1 dark:ring-secondary-dark",
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
      <ReactorItemAction userId={user.id} />
    </li>
  );
}
