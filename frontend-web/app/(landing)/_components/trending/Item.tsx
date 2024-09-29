import * as React from "react";

import Link from "next/link";

import moment from "moment";

import UserLink from "@/components/UserLink";
import { GetTrendingPostsQuery } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { getUserName } from "@/lib/utils";

interface Props {
  index: number;
  post: GetTrendingPostsQuery["trendingPosts"][0];
}

export default function TrendingItem({ index, post }: Readonly<Props>) {
  const userName = getUserName(post.author);
  return (
    <li className="basis-full px-3 md:basis-1/2 md:px-4 md1:basis-1/3">
      <section className="mb-6 flex">
        <span className="-mt-2.5 mr-4 inline-block text-3xl font-bold text-neutral/50">
          0{index}
        </span>
        <div className="flex flex-col">
          {userName && (
            <UserLink
              href={ROUTES.user.userProfile(post.author.id)}
              src={post.author.avatar?.url}
              text={userName}
            />
          )}
          <Link
            href={ROUTES.user.post(post.id)}
            aria-label={post.title}
            className="line-clamp-2 py-2 font-bold leading-4 text-neutral-focus"
          >
            {post.title}
          </Link>
          <span className="flex items-center text-xs text-neutral/70">
            {/* 31536000000 = 1 year in milliseconds */}
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
