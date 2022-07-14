import classNames from "classnames";
import { Modal, ModalHeader } from "components";
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
  modalBody: "overflow-y-auto px-10 pb-10",
  modalBodyTitle: "text-xl text-neutral font-medium text-center mb-6",
  modalBodyItems: "list-none m-0 flex flex-col space-y-4",
  userTile: "flex items-center justify-between",
  userTileLeft: "flex items-start min-w-0 flex-1",
  userTileAuthorName:
    "font-medium text-sm text-neutral hover:text-neutral active:scale-95 line-clamp-1 text-ellipsis",
  userTileAuthorAbout:
    "text-xs text-neutral/60 line-clamp-1 text-ellipsis mt-1",
  userTileImg: "w-10 h-10 inline-block rounded-full overflow-hidden mr-5",
  followBtn:
    "outline-none px-3.5 py-1.5 rounded-full text-sm text-center inline-block active:scale-95",
  followBtnBlock:
    "border-0 bg-accent hover:bg-accent-focus text-base-200 hover:text-base-100",
  followBtnOutline:
    "border border-accent hover:border-accent-focus text-accent hover:text-accent-focus",
  moreBtn:
    "outline-none px-3.5 py-1.5 rounded-full text-sm text-center inline-block bg-transparent active:scale-95 border border-neutral/60 text-neutral/60 hover:text-neutral hover:border-neutral",
};

function UserTile() {
  return (
    <li className={className.userTile}>
      <div className={className.userTileLeft}>
        <span className={className.userTileImg}>
          <Image
            src="/demo.png"
            alt="Avatar"
            width={88}
            height={88}
            layout="responsive"
            objectFit="cover"
          />
        </span>
        <span className="flex flex-col min-w-0 flex-1">
          <Link href={ROUTES.authorProfile("1")} passHref>
            <a
              aria-label="Author Profile"
              className={className.userTileAuthorName}
            >
              Nothing
            </a>
          </Link>
          <p className={className.userTileAuthorAbout}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
            deleniti quam mollitia quaerat quos! Aut molestias sit nesciunt
            dolores assumenda nam suscipit eum, voluptatum cupiditate voluptas
            corporis temporibus dolorum quo.
          </p>
        </span>
      </div>
      <button
        aria-label="Follow"
        type="button"
        className={classNames(
          className.followBtn,
          className[true ? "followBtnBlock" : "followBtnOutline"]
        )}
      >
        Follow
      </button>
    </li>
  );
}

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
      <Modal
        open={open}
        onHide={() => {
          setOpen(false);
        }}
      >
        <ModalHeader onClose={() => setOpen(false)} className="border-none" />
        <div className={className.modalBody}>
          <h2 className={className.modalBodyTitle}>100 followers</h2>
          <ul className={className.modalBodyItems}>
            {Array.from({ length: 15 }).map((_, index) => (
              <UserTile key={index} />
            ))}
            <li className="!mx-6 !mt-6 flex items-center justify-center">
              <button
                type="button"
                aria-label="More"
                className={className.moreBtn}
              >
                More
              </button>
            </li>
          </ul>
        </div>
      </Modal>
    </Fragment>
  );
}
