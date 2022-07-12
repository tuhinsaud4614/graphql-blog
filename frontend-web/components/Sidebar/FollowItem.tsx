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

export default function FollowItem() {
  return (
    <li className={className.root}>
      <Link href="/account/profile">
        <a aria-label="User profile" className={className.avatar}>
          <Image
            height={32}
            width={32}
            src="/demo.png"
            alt="Avatar"
            layout="responsive"
            objectFit="cover"
          />
        </a>
      </Link>
      <Link href="/account/profile">
        <a aria-label="User profile" className={className.mid}>
          <h2 className={className.title}>Suneet Bansal</h2>
          <p className={className.subtitle}>
            Technical Writer | Editor | Coder | Active Stackoveflow contributor
            | Love to learn More |
          </p>
        </a>
      </Link>
      <button type="button" aria-label="Follow" className={className.btn}>
        Follow
      </button>
    </li>
  );
}
