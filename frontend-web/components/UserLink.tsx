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
  text: "ml-2 text-sm text-neutral",
};

export default function UserLink({ href, src, children }: Props) {
  return (
    <Link href={href} passHref>
      <a aria-label={children} className={className.root}>
        <Image
          src={src}
          width={20}
          height={20}
          alt={children}
          className={className.img}
        />
        <span className={className.text}>{children}</span>
      </a>
    </Link>
  );
}
