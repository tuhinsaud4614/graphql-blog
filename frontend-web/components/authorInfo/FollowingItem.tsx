import { Menu } from "components";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { ROUTES } from "utils/constants";

const className = {
  root: "flex items-center justify-between",
  link: "flex items-center min-w-0 flex-1 group",
  img: "rounded-full w-5 h-5 overflow-hidden",
  text: "ml-3 text-sm line-clamp-1 text-ellipsis text-neutral group-hover:text-accent capitalize",
  actions:
    "h-8 w-8 outline-none border-none scale-95 flex items-center justify-center text-neutral hover:bg-accent active:bg-accent-focus rounded-full",
  menuContainer: "w-[18.75rem] p-4 flex flex-col",
  menuHead: "flex items-center group",
  menuHeadImg: "rounded-full w-8 h-8 overflow-hidden",
  menuHeadText:
    "ml-3 text-xl font-medium line-clamp-1 text-ellipsis text-neutral group-hover:text-accent capitalize",
  menuBody: "py-3 text-sm text-neutral",
  menuBottom: "border-t pt-2.5 flex justify-between items-center",
  menuBottomLeft: "text-neutral-focus/50 text-sm",
  menuBottomRight:
    "outline-none border-none text-base-100 text-sm px-2 py-0.5 rounded-full bg-success hover:bg-success-focus shadow-mui hover:shadow-mui-hover active:shadow-mui-active active:scale-95",
};

export default function FollowingItem() {
  return (
    <li className={className.root}>
      <Link href={ROUTES.authorProfile("2")} passHref>
        <a aria-label="Author profile" className={className.link}>
          <span className={className.img}>
            <Image
              src="/demo.png"
              width={20}
              height={20}
              alt="Author profile"
              objectFit="cover"
              layout="responsive"
            />
          </span>
          <span className={className.text}>Lorem ipsum</span>
        </a>
      </Link>
      <More />
    </li>
  );
}

function More() {
  const [anchorEle, setAnchorEle] = useState<null | HTMLButtonElement>(null);
  return (
    <Fragment>
      <button
        aria-label="More actions"
        type="button"
        className={className.actions}
        onClick={(e) => setAnchorEle(e.currentTarget)}
      >
        <FiMoreHorizontal size={20} />
      </button>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <div className={className.menuContainer}>
          <Link href={ROUTES.authorProfile("2")} passHref>
            <a aria-label="Author profile" className={className.menuHead}>
              <span className={className.menuHeadImg}>
                <Image
                  src="/demo.png"
                  width={32}
                  height={32}
                  alt="Author profile"
                  objectFit="cover"
                  layout="responsive"
                />
              </span>
              <span className={className.menuHeadText}>Lorem ipsum</span>
            </a>
          </Link>
          <div className={className.menuBody}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum
            deleniti, numquam asperiores maxime dolore,
          </div>
          <div className={className.menuBottom}>
            <span className={className.menuBottomLeft}>
              101 Follower{"101".length > 1 ? "s" : ""}
            </span>
            <button
              type="button"
              aria-label="Follow"
              className={className.menuBottomRight}
              onClick={() => setAnchorEle(null)}
            >
              Follow
            </button>
          </div>
        </div>
      </Menu>
    </Fragment>
  );
}