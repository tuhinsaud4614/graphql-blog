import { ROUTES } from "@constants";
import classNames from "classnames";
import { Badge, DemoAvatar } from "components";
import { FUserFragment } from "graphql/generated/schema";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { generateFileUrl, getUserName } from "utils";

const className = {
  header: "flex items-center justify-between",
  headerLeft: "flex items-center",
  headerImg: "w-8 h-8 inline-block rounded-full overflow-hidden mr-3",
  headerInfo: "flex flex-col justify-center min-w-0 flex-1",
  headerName:
    "text-neutral dark:text-neutral-dark text-sm hover:text-neutral-focus dark:hover:text-neutral-dark-focus active:scale-95 line-clamp-1 text-ellipsis break-all",
  headerTime:
    "text-neutral/60 dark:text-neutral-dark/60 text-sm line-clamp-1 text-ellipsis",
};

interface Props {
  className?: string;
  children?: ReactNode;
  user: FUserFragment;
  modifyAt: number;
  own?: boolean;
}

export default function Header({
  className: cls,
  user,
  modifyAt,
  own = false,
  children,
}: Props) {
  const userName = getUserName(user);
  const imgUrl = generateFileUrl(user.avatar?.url);
  return (
    <header className={classNames(className.header, cls)}>
      <div className={className.headerLeft}>
        <span className={className.headerImg}>
          {imgUrl ? (
            <Image
              loader={({ src, width, quality }) =>
                `${src}?w=${width}&q=${quality || 75}`
              }
              priority
              src={imgUrl}
              alt={userName}
              width={32}
              height={32}
              layout="responsive"
              objectFit="cover"
            />
          ) : (
            <DemoAvatar aria-label={userName} className="w-8 h-8" />
          )}
        </span>
        <div className={className.headerInfo}>
          <div className="flex items-center">
            <Link href={ROUTES.authorProfile(user.id)} passHref>
              <a aria-label={userName} className={className.headerName}>
                {userName}
              </a>
            </Link>
            {own && (
              <Badge variant="primary" className="ml-2 shrink-0" float={false}>
                You
              </Badge>
            )}
          </div>
          <time className={className.headerTime}>
            about {moment(modifyAt).startOf("second").fromNow()}
          </time>
        </div>
      </div>
      {children}
    </header>
  );
}
