import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import classNames from "classnames";

import { FUserFragment } from "@/graphql/generated/schema";
import { generateFileUrl, getUserName } from "@/utils";
import { ROUTES } from "@/utils/constants";

import DemoAvatar from "../DemoAvatar";
import FollowButton from "./FollowButton";
import UnFollowButton from "./UnFollowButton";

const className = {
  root: "space-y-3 flex items-center",
  avatar: "h-8 w-8 min-w-0 rounded-full shrink-0 overflow-hidden inline-block",
  mid: "flex flex-col ml-2 mr-4 flex-1",
  title:
    "font-bold text-neutral dark:text-neutral-dark line-clamp-2 text-ellipsis break-all",
  subtitle:
    "mt-1 text-sm text-neutral/60 dark:text-neutral-dark/60 line-clamp-2 text-ellipsis",
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

export default function FollowItem({ classes, user, followed = false }: Props) {
  const [isFollowed, setFollowed] = React.useState(followed);

  const userName = getUserName(user);
  const imgUrl = generateFileUrl(user.avatar?.url);
  return (
    <li className={classNames(className.root, classes?.root)}>
      <Link href={ROUTES.authorProfile(user.id)} passHref>
        {imgUrl ? (
          <a
            aria-label={userName}
            className={classNames(className.avatar, classes?.avatar)}
          >
            <Image
              loader={({ src, width, quality }) =>
                `${src}?w=${width}&q=${quality || 75}`
              }
              src={imgUrl}
              alt={userName}
              width={32}
              height={32}
              className="h-[inherit] w-[inherit]"
              layout="responsive"
              objectFit="cover"
            />
          </a>
        ) : (
          <DemoAvatar
            as="a"
            aria-label={userName}
            type="button"
            className="h-8 w-8"
            size={32 / 1.8}
          />
        )}
      </Link>
      <Link href={ROUTES.authorProfile(user.id)}>
        <a
          aria-label={userName}
          className={classNames(className.mid, classes?.mid)}
        >
          <h2 className={classNames(className.title, classes?.title)}>
            {userName}
          </h2>
          <p className={classNames(className.subtitle, classes?.subtitle)}>
            {user.about ||
              `Technical Writer | Editor | Coder | Active Stackoveflow contributor
            | Love to learn More |`}
          </p>
        </a>
      </Link>
      {isFollowed ? (
        <UnFollowButton
          className={classNames(className.btn, classes?.btn)}
          onUnFollow={() => setFollowed(false)}
          toId={user.id}
        />
      ) : (
        <FollowButton
          className={classNames(className.btn, classes?.btn)}
          onFollow={() => setFollowed(true)}
          toId={user.id}
        />
      )}
    </li>
  );
}
