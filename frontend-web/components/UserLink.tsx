import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { generateFileUrl } from "utils";
import DemoAvatar from "./DemoAvatar";

interface Props {
  href: string;
  children: string;
  src?: string;
  classes?: {
    root?: string;
    img?: string;
    text?: string;
  };
}

const className = {
  root: "flex items-center",
  img: "rounded-full w-5 h-5 overflow-hidden dark:ring-1 dark:hover:ring-2 dark:ring-secondary-dark",
  text: "ml-2 text-sm text-neutral dark:text-neutral-dark",
};

export default function UserLink({ href, src, classes, children }: Props) {
  const imgUrl = generateFileUrl(src);
  return (
    <div className={classNames(className.root, classes?.root)}>
      <Link href={href} passHref>
        {imgUrl ? (
          <a
            aria-label={children}
            className={classNames(className.img, classes?.img)}
          >
            <Image
              loader={({ src, width, quality }) =>
                `${src}?w=${width}&q=${quality || 75}`
              }
              src={imgUrl}
              alt={children}
              width={20}
              height={20}
              objectFit="cover"
              layout="responsive"
            />
          </a>
        ) : (
          <DemoAvatar
            as="a"
            aria-label={children}
            type="button"
            className="w-5 h-5"
            size={20 / 1.8}
          />
        )}
      </Link>
      <Link href={href} passHref>
        <a
          className={classNames(className.text, classes?.text)}
          aria-label={children}
        >
          {children}
        </a>
      </Link>
    </div>
  );
}
