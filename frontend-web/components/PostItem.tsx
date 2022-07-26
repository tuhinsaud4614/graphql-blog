import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { ROUTES } from "utils/constants";
import UserLink from "./UserLink";

const className = {
  root: "flex items-center",
  left: "flex flex-col flex-1 min-w-0 pr-5",
  title:
    "line-clamp-2 md1:text-[1.375rem] font-bold leading-5 md1:leading-7 pt-2 text-neutral dark:text-neutral-dark text-ellipsis",
  body: "pt-1 text-neutral/50 dark:text-neutral-dark/50 hidden md:line-clamp-2 text-ellipsis",
  imgContainer:
    "w-14 h-[calc(3.5rem/16*9)] md:w-28 md:h-[calc(7rem/16*9)] bg-neutral/5 relative",
  img: "absolute z-10 inset-0 w-full h-full",
  tags: "flex-1 overflow-hidden flex items-center space-x-2",
  tag: "py-0.5 px-2 text-sm text-neutral/75 dark:text-neutral-dark/75 bg-neutral/5 dark:bg-neutral-dark/5 active:scale-95 capitalize rounded-full whitespace-nowrap",
  timeBox:
    "pt-8 flex items-center text-xs text-neutral/70 dark:text-neutral-dark/70",
  favBtn: "ml-2 active:scale-95 hover:text-secondary-focus",
};

interface Props {
  classes?: {
    root?: string;
    left?: string;
    title?: string;
    body?: string;
    timeBox?: string;
    tag?: string;
    imgContainer?: string;
  };
}

export default function PostItem({ classes }: Props) {
  return (
    <li className={classNames(className.root, classes?.root)}>
      <div className={classNames(className.left, classes?.left)}>
        <UserLink href={ROUTES.authorProfile("1")} src="/favicon.ico">
          Blake Lemoine
        </UserLink>
        <Link href={ROUTES.post("1")} passHref>
          <a className={classNames(className.title, classes?.title)}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
            laborum ad eum distinctio. Placeat minus sunt dolorum reiciendis
            excepturi consequatur dolore enim autem perferendis repellat
            exercitationem voluptate eaque, natus accusantium.
          </a>
        </Link>
        <Link href={ROUTES.post("1234")} passHref>
          <a className={classNames(className.body, classes?.body)}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
            laborum ad eum distinctio. Placeat minus sunt dolorum reiciendis
            excepturi consequatur dolore enim autem perferendis repellat
            exercitationem voluptate eaque, natus accusantium.
          </a>
        </Link>
        <div className={classNames(className.timeBox, classes?.timeBox)}>
          <time>Jun 11</time>
          <span className="px-1.5">·</span>
          <div className={className.tags}>
            <Link href="/post/tag/1234" passHref>
              <a className={classNames(className.tag, classes?.tag)}>
                Technology
              </a>
            </Link>
          </div>
          <button
            type="button"
            aria-label="Favorite"
            className={className.favBtn}
          >
            {true ? (
              <AiFillHeart
                size={20}
                className="text-secondary hover:text-secondary-focus"
              />
            ) : (
              <AiOutlineHeart size={20} />
            )}
          </button>
        </div>
      </div>
      <div
        className={classNames(className.imgContainer, classes?.imgContainer)}
      >
        <Image
          src="/demo.png"
          alt="Post"
          width={(148 / 9) * 16}
          height={148}
          objectFit="cover"
        />
      </div>
    </li>
  );
}
