import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { ROUTES } from "utils/constants";

const className = {
  header: "flex items-center justify-between",
  headerLeft: "flex items-center",
  headerImg: "w-8 h-8 inline-block rounded-full overflow-hidden mr-3",
  headerInfo: "flex flex-col justify-center min-w-0 flex-1",
  headerName:
    "text-neutral dark:text-neutral-dark text-sm hover:text-neutral-focus dark:hover:text-neutral-dark-focus active:scale-95 line-clamp-1 text-ellipsis",
  headerTime:
    "text-neutral/60 dark:text-neutral-dark/60 text-sm line-clamp-1 text-ellipsis",
};

interface Props {
  className?: string;
  children?: ReactNode;
}

export default function Header({ className: cls, children }: Props) {
  return (
    <header className={classNames(className.header, cls)}>
      <div className={className.headerLeft}>
        <span className={className.headerImg}>
          <Image
            src="/demo.png"
            alt="Avatar"
            width={32}
            height={32}
            layout="responsive"
            objectFit="cover"
          />
        </span>
        <div className={className.headerInfo}>
          <Link href={ROUTES.authorProfile("1")} passHref>
            <a aria-label="User profile" className={className.headerName}>
              My name
            </a>
          </Link>
          <time className={className.headerTime}>about 5 hours ago</time>
        </div>
      </div>
      {children}
    </header>
  );
}
