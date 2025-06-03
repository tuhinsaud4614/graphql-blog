import Image from "next/image";
import Link from "next/link";

import { DemoAvatar } from "@/components";
import { GetPostItemFragment } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import {
    cn,
    generateFileUrl,
    getImageFromEditorJsBlocks,
    getPostTitleAndDescription,
    getUserName,
} from "@/lib/utils";
import moment from "moment";

interface Props {
  post: GetPostItemFragment;
  className?: string;
}

export default function PostCard({ post, className }: Readonly<Props>) {
  const userName = getUserName(post.author);
  const { title } = getPostTitleAndDescription(post, undefined, undefined);
  const postImgUrl = getImageFromEditorJsBlocks(post.content);
  const authorImgUrl = generateFileUrl(post.author.avatar?.url);
  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl bg-base-100 shadow-mui dark:bg-base-200",
        className,
      )}
    >
      <Link
        className="relative block aspect-[2/1] overflow-hidden"
        href={ROUTES.user.post(post.id)}
      >
        <Image
          loader={({ src, width, quality }) =>
            `${src}?w=${width}&q=${quality ?? 75}`
          }
          priority
          src={
            generateFileUrl(post.image?.url || postImgUrl || undefined) ||
            "/placeholder.svg"
          }
          alt={title ?? "Untitled"}
          width={(148 / 9) * 16}
          height={148}
          className="absolute inset-0 size-full object-cover"
        />
      </Link>
      <div className="space-y-4 p-4">
        <Link
          href={ROUTES.user.post(post.id)}
          className="line-clamp-3 block text-lg font-bold tracking-tight text-neutral lg:text-xl"
        >
          {title ?? "Untitled"}
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {authorImgUrl ? (
              <Link
                href={ROUTES.user.userProfile(post.author.id)}
                aria-label={userName ?? undefined}
                className="size-5 overflow-hidden rounded-full dark:ring-1 dark:ring-secondary dark:hover:ring-2"
              >
                <Image
                  loader={({ src, width, quality }) =>
                    `${src}?w=${width}&q=${quality ?? 75}`
                  }
                  src={authorImgUrl}
                  alt={userName ?? ""}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </Link>
            ) : (
              <DemoAvatar
                as={Link}
                href={ROUTES.user.userProfile(post.author.id)}
                aria-label={userName ?? undefined}
                className="size-10 shrink-0"
                size={40 / 1.8}
              />
            )}
            <div className="ml-4 flex flex-col">
              <Link
                href={ROUTES.user.userProfile(post.author.id)}
                className="dark:text-neutral-dark line-clamp-1 text-xs text-neutral"
                aria-label={userName ?? undefined}
              >
                {userName ?? "Anonymous"}
              </Link>
              <time className="dark:text-neutral-dark/50 line-clamp-1 text-xs text-neutral/50">
                {moment(+post.updatedAt).startOf("second").fromNow()}
              </time>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
