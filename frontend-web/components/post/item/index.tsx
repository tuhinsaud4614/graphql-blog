"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import moment from "moment";

import UserLink from "@/components/UserLink";
import { GetPostItemFragment } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import {
  cn,
  generateFileUrl,
  getPostTitleAndDescription,
  getUserName,
} from "@/lib/utils";
import { itemInVariants } from "@/lib/variants/framer-variants";

import FavoriteButton from "./FavoriteButton";

const className = {
  root: "flex items-center",
  left: "flex flex-col flex-1 min-w-0 pr-5",
  title:
    "line-clamp-2 md1:text-[1.375rem] font-bold leading-5 md1:leading-7 pt-2 text-neutral text-ellipsis",
  body: "pt-1 text-neutral/50 hidden md:line-clamp-2 text-ellipsis",
  imgContainer:
    "w-14 h-[calc(3.5rem_/_16_*_9)] md:w-28 md:h-[calc(7rem_/_16_*_9)] bg-neutral/5 relative",
  img: "absolute z-10 inset-0 w-full h-full",
  tags: "flex-1 flex-wrap md:flex-nowrap md:overflow-hidden flex items-center space-x-2 space-y-2 -mt-2",
  tag: "first:mt-2 py-0.5 px-2 text:xs md:text-sm text-neutral/75 bg-neutral/5 active:scale-95 capitalize rounded-full whitespace-nowrap",
  timeBox:
    "pt-8 flex items-center text-xs text-neutral/70 dark:text-neutral-dark/70",
};

interface Props {
  classes?: {
    root?: string;
    left?: string;
    title?: string;
    body?: string;
    timeBox?: string;
    tag?: string;
    imgContainer?: string;
  };
  post: GetPostItemFragment;
}

export default function PostItem({ classes, post }: Props) {
  // const rdxUser = useAppSelector(selectUser);
  const userName = getUserName(post.author);

  const { title, description } = getPostTitleAndDescription(
    post,
    undefined,
    post.author,
  );

  return (
    <motion.li
      layout
      variants={itemInVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.5 }}
      className={cn(className.root, classes?.root)}
    >
      <div className={cn(className.left, classes?.left)}>
        <UserLink
          href={ROUTES.user.userProfile(post.author.id)}
          src={post.author.avatar?.url}
          classes={{ root: "dark:ml-0.5" }}
          text={userName || "Anonymous"}
        />
        {!!title && (
          <Link
            href={ROUTES.user.post(post.id)}
            aria-label={title}
            className={cn(className.title, classes?.title)}
          >
            {title}
          </Link>
        )}
        {!!description && (
          <Link
            href={ROUTES.user.post(post.id)}
            aria-label={description}
            className={cn(className.body, classes?.body)}
          >
            {description}
          </Link>
        )}
        <div className={cn(className.timeBox, classes?.timeBox)}>
          <time>{moment(+post.updatedAt).startOf("second").fromNow()}</time>
          <span className="px-1.5">·</span>
          <div className={className.tags}>
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag.id}
                href={ROUTES.user.postsByTag(tag.id)}
                aria-label={tag.title}
                className={cn(className.tag, classes?.tag)}
              >
                {tag.title}
              </Link>
            ))}
          </div>
          <FavoriteButton />
        </div>
      </div>
      <div className={cn(className.imgContainer, classes?.imgContainer)}>
        {post.image ? (
          <Image
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality ?? 75}`
            }
            priority
            src={generateFileUrl(post.image.url) ?? ""}
            alt={title ?? "Untitled"}
            width={(148 / 9) * 16}
            height={148}
            className={cn("object-cover", className.img)}
          />
        ) : (
          <Image
            priority
            src="/placeholder.svg"
            alt={post.id}
            width={(148 / 9) * 16}
            height={148}
            className={cn("object-cover", className.img)}
          />
        )}
      </div>
    </motion.li>
  );
}
