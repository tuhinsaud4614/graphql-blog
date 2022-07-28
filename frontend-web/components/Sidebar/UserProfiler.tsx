import classNames from "classnames";
import { Button, ReactorModal, ReactorModalItem } from "components";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ROUTES } from "utils/constants";

const className = {
  root: "flex flex-col items-start",
  img: "w-[5.5rem] h-[5.5rem] inline-block rounded-full overflow-hidden",
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
  own?: boolean;
}

export default function UserProfiler({ classes, own = false }: Props) {
  return (
    <div className={classNames(className.root, classes?.root)}>
      <span className={classNames(className.img, classes?.img)}>
        <Image
          src="/demo.png"
          alt="Avatar"
          width={88}
          height={88}
          layout="responsive"
          objectFit="cover"
        />
      </span>
      <Link href={ROUTES.authorProfile("1")} passHref>
        <a aria-label="Author Profile" className={className.name}>
          Nothing
        </a>
      </Link>
      {own ? (
        <Link href={ROUTES.accountSettings}>
          <a aria-label="Settings" className={className.editLink}>
            Edit profile
          </a>
        </Link>
      ) : (
        <Other />
      )}
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
        outline
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
