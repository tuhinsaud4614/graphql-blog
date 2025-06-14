"use client";

import * as React from "react";

import Image from "next/image";

import { User2 } from "lucide-react";

import DemoAvatar from "@/components/DemoAvatar";
import Button from "@/components/ui/Button";
import Menu from "@/components/ui/Menu";
import LogoutButton from "@/components/user-avatar-button/LogoutButton";
import useUser from "@/hooks/useUser";
import { generateFileUrl, getUserName } from "@/lib/utils";
import { skeletonVariant } from "@/lib/variants/classVariants";

export default function UserShortProfile() {
  const user = useUser();
  const [anchorEle, setAnchorEle] = React.useState<null | HTMLButtonElement>(
    null,
  );

  // Show loading state only on client-side
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <span
        className={skeletonVariant({
          className: "h-9 w-9",
          shape: "circle",
        })}
      />
    );
  }

  if (!user) {
    return (
      <DemoAvatar
        as="button"
        aria-label="Demo avatar"
        type="button"
        className="size-9 rounded-full border border-secondary/50 text-secondary hover:border-secondary hover:bg-secondary/5 dark:border-secondary-content/50 dark:text-secondary-content dark:hover:border-secondary-content dark:hover:bg-secondary-content/[8%]"
      />
    );
  }

  const imgUrl = generateFileUrl(user.avatar?.url);
  const userName = getUserName(user);
  return (
    <>
      <Button
        type="button"
        mode="outline"
        className="size-9 shrink-0 overflow-hidden rounded-full border p-0 active:scale-95 dark:border-none dark:ring-1 dark:ring-accent dark:hover:ring-2"
        onClick={(e) => {
          setAnchorEle(e.currentTarget);
        }}
      >
        {imgUrl ? (
          <Image
            loader={({ src, width, quality }) =>
              `${src}?w=${width}&q=${quality || 75}`
            }
            src={imgUrl}
            alt="Avatar"
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
        ) : (
          <User2 size={20} />
        )}
      </Button>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        hideArrow
      >
        <div className="w-60">
          <ul className="m-0 flex list-none flex-col">
            <li className="px-4 py-2 capitalize text-secondary">{userName}</li>
            <li className="hover:bg-base-200 dark:hover:bg-base-100">
              <LogoutButton />
            </li>
          </ul>
        </div>
      </Menu>
    </>
  );
}
