import UserLink from "components/UserLink";
import Image from "next/image";
import Link from "next/link";

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

export default function PostItem() {
  return (
    <li className={className.root}>
      <div className={className.left}>
        <UserLink href="/account/profile" src="/favicon.ico">
          Blake Lemoine
        </UserLink>
        <Link href="/post/1234" passHref>
          <a className={className.title}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
            laborum ad eum distinctio. Placeat minus sunt dolorum reiciendis
            excepturi consequatur dolore enim autem perferendis repellat
            exercitationem voluptate eaque, natus accusantium.
          </a>
        </Link>
        <Link href="/post/1234" passHref>
          <a className={className.body}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod
            laborum ad eum distinctio. Placeat minus sunt dolorum reiciendis
            excepturi consequatur dolore enim autem perferendis repellat
            exercitationem voluptate eaque, natus accusantium.
          </a>
        </Link>
        <div className={className.timeBox}>
          <time>Jun 11</time>
          <span className="px-1.5">·</span>
          <time>44 min</time>
          <span className="px-1.5">·</span>
          <Link href="/post/tag/1234" passHref>
            <a className={className.tag}>Technology</a>
          </Link>
        </div>
      </div>
      <div className={className.imgContainer}>
        <Image
          className={className.imgContainer}
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
