import Image from "next/image";
import Link from "next/link";

import { DemoAvatar } from "@/components";
import { FUserFragment } from "@/graphql/generated/schema";
import { generateFileUrl, getUserName } from "@/utils";
import { ROUTES } from "@/utils/constants";

const className = {
  root: "w-12 h-12 inline-block rounded-full dark:ring-1 dark:hover:ring-2 dark:ring-secondary-dark",
};

interface Props {
  user: FUserFragment;
}

export default function FollowItem({ user }: Props) {
  const username = getUserName(user);
  const imgUrl = generateFileUrl(user.avatar?.url);

  return (
    <Link href={ROUTES.authorProfile(user.id)}>
      {imgUrl ? (
        <a aria-label={username} className={className.root}>
          <Image
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality || 75}`
            }
            src={imgUrl}
            alt={username}
            width={48}
            height={48}
            className="rounded-full"
            objectFit="cover"
            layout="responsive"
          />
        </a>
      ) : (
        <DemoAvatar
          as="a"
          aria-label={username}
          className="h-12 w-12"
          size={48 / 1.8}
        />
      )}
    </Link>
  );
}
