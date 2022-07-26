import Image from "next/image";
import Link from "next/link";

interface Props {
  href: string;
  src: string;
  children: string;
}

const className = {
  root: "flex items-center",
  img: "rounded-full w-5 h-5 overflow-hidden",
  text: "ml-2 text-sm text-neutral dark:text-neutral-dark",
};

export default function UserLink({ href, src, children }: Props) {
  return (
    <div className={className.root}>
      <Link href={href} passHref>
        <a aria-label={children} className={className.img}>
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
        <a className={className.text} aria-label={children}>
          {children}
        </a>
      </Link>
    </div>
  );
}
