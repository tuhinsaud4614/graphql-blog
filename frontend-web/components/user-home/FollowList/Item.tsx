import Image from "next/image";
import Link from "next/link";

const className = {
  root: "w-12 h-12 inline-block rounded-full overflow-hidden",
};

export default function FollowItem() {
  return (
    <Link href="/account/profile">
      <a aria-label="Following" className={className.root}>
        <Image
          src="/demo.png"
          alt="Avatar"
          width={48}
          height={48}
          objectFit="cover"
          layout="responsive"
        />
      </a>
    </Link>
  );
}
