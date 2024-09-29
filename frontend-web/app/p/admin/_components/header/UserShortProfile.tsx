"use client";

import * as React from "react";

import Image from "next/image";

import { User2 } from "lucide-react";
import { useSession } from "next-auth/react";

import Button from "@/components/ui/Button";
import Menu from "@/components/ui/Menu";
import LogoutButton from "@/components/user-avatar-button/LogoutButton";
import { generateFileUrl, getUserName } from "@/lib/utils";
import { skeletonVariant } from "@/lib/variants/classVariants";

export default function UserShortProfile() {
  const { data: session } = useSession();
  const [anchorEle, setAnchorEle] = React.useState<null | HTMLButtonElement>(
    null,
  );

  if (!session?.user) {
    return (
      <span
        className={skeletonVariant({
          className: "h-9 w-9",
          shape: "circle",
        })}
      />
    );
  }

  const { user } = session;
  const imgUrl = generateFileUrl(user.avatar?.url);
  const userName = getUserName(user);
  return (
    <>
      <Button
        type="button"
        mode="outline"
        className="h-9 w-9 shrink-0 overflow-hidden rounded-full border p-0 active:scale-95 dark:border-none dark:ring-1 dark:ring-accent dark:hover:ring-2"
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
            className="rounded-full object-cover"
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
