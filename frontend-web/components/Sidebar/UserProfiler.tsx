import { selectUser } from "@features";
import classNames from "classnames";
import {
  Button,
  ClientOnly,
  DemoAvatar,
  ReactorModal,
  ReactorModalItem,
} from "components";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useAppSelector } from "store";
import { generateFileUrl, getUserName } from "utils";
import { ROUTES } from "utils/constants";
import { IUser } from "utils/interfaces";

const className = {
  root: "flex flex-col items-start",
  img: "w-[5.5rem] h-[5.5rem] inline-block rounded-full overflow-hidden border-2 dark:border-none dark:ring-1 dark:ring-secondary-dark p-1",
  name: "text-neutral dark:text-neutral-dark hover:text-neutral-focus dark:hover:text-neutral-dark-focus font-medium mt-4 active:scale-95",
  editLink:
    "mt-6 text-sm text-accent dark:text-accent-dark hover:text-neutral dark:hover:text-neutral-dark-focus active:scale-95",
  countBtn:
    "border-none outline-none text-neutral/60 dark:text-neutral-dark/60 hover:text-neutral-focus dark:hover:text-neutral-dark-focus active:scale-95 min-w-min mt-1",
  about:
    "mt-3 text-sm text-neutral/50 dark:text-neutral-dark/50 line-clamp-1 text-ellipsis",
  followBtn:
    "outline-none px-3.5 py-1.5 rounded-full text-sm text-center inline-block active:scale-95",
};

interface Props {
  classes?: {
    root?: string;
    img?: string;
  };
  user: IUser;
}

export default function UserProfiler({ classes, user }: Props) {
  const rdxUser = useAppSelector(selectUser);
  const userName = getUserName(user);
  const imgUrl = generateFileUrl(user.avatar?.url);
  return (
    <div className={classNames(className.root, classes?.root)}>
      {imgUrl ? (
        <span className={classNames(className.img, classes?.img)}>
          <Image
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality || 75}`
            }
            src={imgUrl}
            alt={userName}
            width={88}
            height={88}
            layout="responsive"
            objectFit="cover"
            className="rounded-full"
          />
        </span>
      ) : (
        <DemoAvatar className="w-[5.5rem] h-[5.5rem]" size={88 / 1.8} />
      )}
      <Link href={ROUTES.authorProfile(user.id)} passHref>
        <a aria-label={userName} className={className.name}>
          {userName}
        </a>
      </Link>
      <ClientOnly>
        {user && rdxUser && user.id === rdxUser.id ? (
          <Link href={ROUTES.accountSettings}>
            <a aria-label="Settings" className={className.editLink}>
              Edit profile
            </a>
          </Link>
        ) : (
          <Other />
        )}
      </ClientOnly>
    </div>
  );
}

function Other() {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <button
        aria-label="Followers"
        type="button"
        onClick={() => setOpen(true)}
        className={className.countBtn}
      >
        100 followers
      </button>
      <p className={className.about}>
        All you need to know about Nodejs 18 A Quick Intro Node.js is a cross-
      </p>
      <Button
        aria-label="Following"
        type="button"
        className="mt-3 text-sm"
        mode="outline"
      >
        Following
      </Button>
      <ReactorModal
        title="100 followers"
        open={open}
        onHide={() => setOpen(false)}
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <ReactorModalItem key={index} />
        ))}
      </ReactorModal>
    </Fragment>
  );
}
