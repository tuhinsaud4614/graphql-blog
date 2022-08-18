import { Button, DemoAvatar, Menu } from "components";
import { FUserFragment } from "graphql/generated/schema";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { generateFileUrl, getUserName } from "utils";
import { ROUTES } from "utils/constants";

const className = {
  root: "flex items-center justify-between",
  link: "flex items-center min-w-0 flex-1 group",
  img: "rounded-full w-5 h-5 overflow-hidden border dark:ring-1 dark:group-hover:ring-2 dark:ring-secondary-dark",
  text: "ml-3 text-sm line-clamp-1 text-ellipsis text-neutral dark:text-neutral-dark group-hover:text-accent dark:group-hover:text-accent-dark capitalize",
  actions:
    "h-8 w-8 outline-none border-none scale-95 flex items-center justify-center text-neutral dark:text-neutral-dark dark:hover:text-neutral hover:bg-accent dark:hover:bg-accent-dark active:bg-accent-focus dark:active:bg-accent active:scale-95 rounded-full",
  menuContainer: "w-[18.75rem] p-4 flex flex-col",
  menuHead: "flex items-center group",
  menuHeadImg:
    "rounded-full w-8 h-8 overflow-hidden dark:ring-1 dark:group-hover:ring-2 dark:ring-secondary-dark",
  menuHeadText:
    "ml-3 text-xl font-medium line-clamp-1 text-ellipsis text-neutral dark:text-neutral-dark group-hover:text-accent dark:group-hover:text-accent-dark capitalize",
  menuBody: "py-3 text-sm text-neutral dark:text-neutral-dark",
  menuBottom:
    "border-t dark:border-base-dark-300 pt-2.5 flex justify-between items-center",
  menuBottomLeft: "text-neutral/60 dark:text-neutral-dark/60 text-sm",
};

interface Props {
  user: FUserFragment;
}

export default function FollowingItem({ user }: Props) {
  const username = getUserName(user);
  const imgUrl = generateFileUrl(user.avatar?.url);
  return (
    <li className={className.root}>
      <Link href={ROUTES.authorProfile(user.id)} passHref>
        <a aria-label={username} className={className.link}>
          {imgUrl ? (
            <span className={className.img}>
              <Image
                loader={({ src, width, quality }) =>
                  `${src}?w=${width}&q=${quality || 75}`
                }
                src={imgUrl}
                alt={username}
                width={20}
                height={20}
                objectFit="cover"
                layout="responsive"
              />
            </span>
          ) : (
            <DemoAvatar className="w-5 h-5" size={20 / 1.8} />
          )}
          <span className={className.text}>{username}</span>
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
            <Button
              type="button"
              aria-label="Follow"
              className="text-sm !px-2 !py-0.5"
              onClick={() => setAnchorEle(null)}
            >
              Follow
            </Button>
          </div>
        </div>
      </Menu>
    </Fragment>
  );
}
