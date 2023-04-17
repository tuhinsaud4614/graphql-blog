import * as React from "react";

import Link from "next/link";

import moment from "moment";

import { UserLink } from "@/components";
import type { GetTrendingPostsQuery } from "@/graphql/generated/schema";
import { getUserName } from "@/utils";
import { ROUTES } from "@/utils/constants";

const className = {
  root: "basis-full md:basis-1/2 md1:basis-1/3 px-3 md:px-4",
  container: "flex mb-6",
  index:
    "mr-4 -mt-2.5 inline-block text-3xl text-neutral/50 dark:text-neutral-dark/50 font-bold",
  content: "flex flex-col",
  title:
    "line-clamp-2 font-bold text-neutral-focus dark:text-neutral-dark-focus py-2 leading-4",
  timeBox:
    "flex items-center text-xs text-neutral/70 dark:text-neutral-dark/70",
};

interface Props {
  index: number;
  post: GetTrendingPostsQuery["trendingPosts"][0];
}

export default function TrendingItem({ index, post }: Props) {
  const userName = getUserName(post.author);
  return (
    <li className={className.root}>
      <section className={className.container}>
        <span className={className.index}>0{index}</span>
        <div className={className.content}>
          <UserLink
            href={ROUTES.authorProfile(post.author.id)}
            src={post.author.avatar?.url}
          >
            {userName}
          </UserLink>
          <Link href={ROUTES.post(post.id)} passHref>
            <a aria-label={post.title} className={className.title}>
              {post.title}
            </a>
          </Link>
          <span className={className.timeBox}>
            {Math.abs(Date.now() - +post.updatedAt) / 31536000000 > 1 ? (
              <React.Fragment>
                <time>{moment(+post.updatedAt).format("MMM Do YY")}</time>
                <span className="px-1.5">·</span>
                <time>{moment(+post.updatedAt).format("h:mm a")}</time>
              </React.Fragment>
            ) : (
              <time>{moment(+post.updatedAt).startOf("second").fromNow()}</time>
            )}
          </span>
        </div>
      </section>
    </li>
  );
}
