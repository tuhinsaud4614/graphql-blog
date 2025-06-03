"use client";

import Link from "next/link";

import moment from "moment";

import { UserLink } from "@/components";
import { GetPostItemFragment } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { getUserName } from "@/lib/utils";

const className = {
  root: "flex flex-col",
  content: "mt-2",
  title: "font-bold text-neutral dark:text-neutral-dark",
  timeBox:
    "pt-2 flex items-center text-xs text-neutral/70 dark:text-neutral-dark/70",
};

interface Props {
  post: GetPostItemFragment;
}

export default function PostItem({ post }: Readonly<Props>) {
  const userName = getUserName(post.author);
  return (
    <li className={className.root}>
      <UserLink
        href={ROUTES.user.userProfile(post.author.id)}
        src={post.author.avatar?.url}
        text={userName ?? ""}
      />
      <div className={className.content}>
        <Link
          href={ROUTES.user.post(post.id)}
          aria-label={post.title}
          className={className.title}
        >
          {post.title}
        </Link>
        <div className={className.timeBox}>
          <time>{moment(+post.updatedAt).startOf("second").fromNow()}</time>
        </div>
      </div>
    </li>
  );
}
