import classNames from "classnames";
import { ReactorModal, ReactorModalItem } from "components";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { ROUTES } from "utils/constants";

const className = {
  root: "flex flex-col items-start",
  img: "w-[5.5rem] h-[5.5rem] inline-block rounded-full overflow-hidden",
  name: "text-neutral hover:text-neutral-focus font-medium mt-4 active:scale-95",
  countBtn:
    "border-none outline-none text-neutral/60 text-neutral-focus active:scale-95 min-w-min mt-1",
  about: "mt-3 text-sm text-neutral/60 line-clamp-1 text-ellipsis",
  followBtn:
    "outline-none px-3.5 py-1.5 rounded-full text-sm text-center inline-block active:scale-95",
  followBtnBlock:
    "border-0 bg-accent hover:bg-accent-focus text-base-200 hover:text-base-100",
  followBtnOutline:
    "border border-accent hover:border-accent-focus text-accent hover:text-accent-focus",
};

interface Props {
  classes?: {
    root?: string;
    img?: string;
  };
}

export default function UserProfiler({ classes }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
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
        <button
          aria-label="Follow"
          type="button"
          className={classNames(
            className.followBtn,
            "mt-3",
            className[false ? "followBtnBlock" : "followBtnOutline"]
          )}
        >
          Follow
        </button>
      </div>
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
