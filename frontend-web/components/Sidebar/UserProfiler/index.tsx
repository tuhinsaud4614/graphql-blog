"use client";

import Image from "next/legacy/image";
import Link from "next/link";

import ClientOnly from "@/components/ClientOnly";
import DemoAvatar from "@/components/DemoAvatar";
import { FUserFragment } from "@/graphql/generated/schema";
import useUser from "@/hooks/useUser";
import { ROUTES } from "@/lib/constants";
import { cn, generateFileUrl, getUserName } from "@/lib/utils";

import OtherInfo from "./OtherInfo";

const className = {
  root: "flex flex-col items-start",
  img: "w-[5.5rem] h-[5.5rem] inline-block rounded-full overflow-hidden border-2 dark:border-none dark:ring-1 dark:ring-secondary-dark p-1",
  name: "text-neutral dark:text-neutral-dark hover:text-neutral-focus dark:hover:text-neutral-dark-focus font-medium mt-4 active:scale-95",
  editLink:
    "mt-6 text-sm text-accent dark:text-accent-dark hover:text-neutral dark:hover:text-neutral-dark-focus active:scale-95",
};

interface Props {
  classes?: {
    root?: string;
    img?: string;
  };
  user: FUserFragment;
}

export default function UserProfiler({ classes, user }: Props) {
  const authUser = useUser();
  const userName = getUserName(user);
  const imgUrl = generateFileUrl(user.avatar?.url);
  return (
    <div className={cn(className.root, classes?.root)}>
      {imgUrl ? (
        <span className={cn(className.img, classes?.img)}>
          <Image
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality || 75}`
            }
            src={imgUrl}
            alt={userName ?? ""}
            width={88}
            height={88}
            layout="responsive"
            objectFit="cover"
            className="rounded-full"
          />
        </span>
      ) : (
        <DemoAvatar className="size-[5.5rem]" size={88 / 1.8} />
      )}
      <Link
        href={ROUTES.user.userProfile(user.id)}
        aria-label={userName}
        className={className.name}
      >
        {userName}
      </Link>

      <ClientOnly>
        {user && authUser && user.id === authUser.id ? (
          <Link
            href={ROUTES.user.settings}
            aria-label="Settings"
            className={className.editLink}
          >
            Edit profile
          </Link>
        ) : (
          <OtherInfo user={user} authenticated={!!authUser} />
        )}
      </ClientOnly>
    </div>
  );
}
