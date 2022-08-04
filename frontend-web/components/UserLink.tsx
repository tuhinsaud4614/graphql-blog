import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

interface Props {
  href: string;
  src: string;
  children: string;
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
  return (
    <div className={classNames(className.root, classes?.root)}>
      <Link href={href} passHref>
        <a
          aria-label={children}
          className={classNames(className.img, classes?.img)}
        >
          <Image
            src={src}
            width={20}
            height={20}
            alt={children}
            objectFit="cover"
            layout="responsive"
          />
        </a>
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
