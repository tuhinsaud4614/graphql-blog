import { ROUTES } from "@constants";
import Image from "next/image";
import Link from "next/link";

const className = {
  root: "my-8 flex items-center",
  img: "w-12 h-12 inline-block rounded-full overflow-hidden mr-4",
  content: "flex flex-col justify-center flex-1 min-w-0",
  title: "text-neutral dark:text-neutral-dark line-clamp-1 text-ellipsis",
  timeBox: "text-neutral/60 dark:text-neutral-dark/60 text-sm",
};

export default function AuthorInfo() {
  return (
    <section className={className.root}>
      <Link href={ROUTES.authorProfile("1")} passHref>
        <a aria-label="Author Profile" className={className.img}>
          <Image
            src="/demo.png"
            alt="Avatar"
            width={48}
            height={48}
            layout="responsive"
            objectFit="cover"
          />
        </a>
      </Link>
      <div className={className.content}>
        <Link href={ROUTES.authorProfile("1")} passHref>
          <a aria-label="Author Profile" className={className.title}>
            Nothing
          </a>
        </Link>
        <time className={className.timeBox}>Jun 11</time>
      </div>
    </section>
  );
}
