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

export default function UserLink({ href, src, classes, text }: Props) {
  const imgUrl = generateFileUrl(src);
  return (
    <div className={cn("flex items-center", classes?.root)}>
      {imgUrl ? (
        <Link
          href={href}
          aria-label={text}
          className={cn(
            "h-5 w-5 overflow-hidden rounded-full dark:ring-1 dark:ring-secondary dark:hover:ring-2",
            classes?.img,
          )}
        >
          <Image
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality || 75}`
            }
            src={imgUrl}
            alt={text}
            width={20}
            height={20}
            className="object-cover"
          />
        </Link>
      ) : (
        <DemoAvatar
          as={Link}
          href={href}
          aria-label={text}
          className="h-5 w-5"
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
