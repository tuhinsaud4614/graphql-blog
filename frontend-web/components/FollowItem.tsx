import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

const className = {
  root: "space-y-3 flex items-center",
  avatar: "h-8 w-8 min-w-0 rounded-full overflow-hidden inline-block",
  mid: "flex flex-col ml-2 mr-4 flex-1",
  title: "font-bold text-neutral line-clamp-2 text-ellipsis",
  subtitle: "mt-1 text-sm text-[#757575] line-clamp-2 text-ellipsis",
  btn: "outline-none rounded-full border border-accent hover:border-accent-focus text-accent hover:text-accent-focus text-sm py-1 px-3 active:scale-95",
};

interface Props {
  classes?: {
    root?: string;
    avatar?: string;
    mid?: string;
    title?: string;
    subtitle?: string;
    btn?: string;
  };
}

export default function FollowItem({ classes }: Props) {
  return (
    <li className={classNames(className.root, classes?.root)}>
      <Link href="/account/profile">
        <a
          aria-label="User profile"
          className={classNames(className.avatar, classes?.avatar)}
        >
          <Image
            height={32}
            width={32}
            src="/demo.png"
            alt="Avatar"
            className="h-[inherit] w-[inherit]"
            layout="responsive"
            objectFit="cover"
          />
        </a>
      </Link>
      <Link href="/account/profile">
        <a
          aria-label="User profile"
          className={classNames(className.mid, classes?.mid)}
        >
          <h2 className={classNames(className.title, classes?.title)}>
            Suneet Bansal
          </h2>
          <p className={classNames(className.subtitle, classes?.subtitle)}>
            Technical Writer | Editor | Coder | Active Stackoveflow contributor
            | Love to learn More |
          </p>
        </a>
      </Link>
      <button
        type="button"
        aria-label="Follow"
        className={classNames(className.btn, classes?.btn)}
      >
        Follow
      </button>
    </li>
  );
}
