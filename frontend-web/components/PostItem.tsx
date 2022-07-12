import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import UserLink from "./UserLink";

const className = {
  root: "flex items-center",
  left: "flex flex-col basis-full pr-5",
  title:
    "line-clamp-2 md1:text-2xl font-bold leading-5 pt-2 text-neutral text-ellipsis",
  body: "pt-1 text-neutral/50 hidden md:line-clamp-2 text-ellipsis",
  timeBox: "pt-2 flex items-center text-xs text-neutral/70",
  tag: "py-0.5 px-2 text-sm text-neutral/75 bg-neutral/5 active:scale-95 capitalize rounded-full whitespace-nowrap",
  imgContainer:
    "min-w-0 w-[6.25rem] md:w-[12.5rem] bg-neutral/5 flex items-center justify-center",
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
        <UserLink href="/account/profile" src="/favicon.ico">
          Blake Lemoine
        </UserLink>
        <Link href="/post/1234" passHref>
          <a className={classNames(className.title, classes?.title)}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
            laborum ad eum distinctio. Placeat minus sunt dolorum reiciendis
            excepturi consequatur dolore enim autem perferendis repellat
            exercitationem voluptate eaque, natus accusantium.
          </a>
        </Link>
        <Link href="/post/1234" passHref>
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
          <Link href="/post/tag/1234" passHref>
            <a className={classNames(className.tag, classes?.tag)}>
              Technology
            </a>
          </Link>
        </div>
      </div>
      <div
        className={classNames(className.imgContainer, classes?.imgContainer)}
      >
        <Image
          className={classNames(className.imgContainer, classes?.imgContainer)}
          src="/demo.png"
          alt="Post"
          width={200}
          height={148}
          objectFit="cover"
        />
      </div>
    </li>
  );
}
