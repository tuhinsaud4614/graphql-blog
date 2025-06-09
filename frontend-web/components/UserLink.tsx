"use client";

import Image from "next/image";
import Link from "next/link";

import { cn, generateFileUrl } from "@/lib/utils";

import DemoAvatar from "./DemoAvatar";

interface Props {
  href: string;
  text: string;
  src?: string;
  classes?: {
    root?: string;
    img?: string;
    text?: string;
  };
}

export default function UserLink({
  href,
  src,
  classes,
  text,
}: Readonly<Props>) {
  const imgUrl = generateFileUrl(src);
  return (
    <div className={cn("flex items-center", classes?.root)}>
      {imgUrl ? (
        <Link
          href={href}
          aria-label={text}
          className={cn(
            "size-5 overflow-hidden rounded-full dark:ring-1 dark:ring-secondary dark:hover:ring-2",
            classes?.img,
          )}
        >
          <Image
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality ?? 75}`
            }
            src={imgUrl}
            alt={text}
            width={0}
            height={0}
            className="size-5 object-cover"
          />
        </Link>
      ) : (
        <DemoAvatar
          as={Link}
          href={href}
          aria-label={text}
          className="size-5"
          size={20 / 1.8}
        />
      )}
      <Link
        href={href}
        className={cn("ml-2 text-sm text-neutral", classes?.text)}
        aria-label={text}
      >
        {text}
      </Link>
    </div>
  );
}
