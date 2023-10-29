"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Settings } from "lucide-react";

import { useAuthUser } from "@/hooks/useAuth";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ROUTES } from "@/lib/constants";
import { IAnchorOrigin } from "@/lib/types";
import { cn, generateFileUrl, getUserName } from "@/lib/utils";

import DemoAvatar from "../DemoAvatar";
import NavAvatar from "../NavAvatar";
import Menu from "../ui/Menu";
import LogoutButton from "./LogoutButton";

const className = {
  avatarMenu: "w-60 py-2",
  avatarMenuItems: "list-none m-0 flex flex-col",
  avatarMenuLink:
    "w-full outline-none border-none flex items-center px-4 py-2 text-sm text-neutral hover:text-accent",
  avatarInfo: "flex px-4 hover:bg-base-200 py-2 group",
  avatarInfoImg:
    "shrink-0 w-8 h-8 inline-block rounded-full overflow-hidden border dark:border-none dark:ring-1 dark:group-hover:ring-2 dark:ring-secondary mr-3",
  avatarInfoDetail: "flex flex-col",
  name: "pb-1 text-sm line-clamp-1 text-ellipsis text-neutral dark:group-hover:text-accent",
  bio: "text-xs line-clamp-1 text-ellipsis text-neutral/60 group-hover:text-accent",
};

interface Props {
  hideOnSmallDevice?: boolean;
  anchorOrigin: IAnchorOrigin;
}

export default function UserAvatarButton({
  hideOnSmallDevice = false,
  anchorOrigin,
}: Props) {
  const user = useAuthUser();
  const { push } = useRouter();
  const [anchorEle, setAnchorEle] = React.useState<null | HTMLButtonElement>(
    null,
  );
  const matches = useMediaQuery("(min-width: 1024px)");

  React.useEffect(() => {
    if (hideOnSmallDevice && !matches) {
      setAnchorEle(null);
    }
  }, [matches, hideOnSmallDevice]);

  if (!user) {
    return (
      <DemoAvatar
        as="button"
        aria-label="Demo avatar"
        className="h-9 w-9 border-secondary"
        onClick={() => push(ROUTES.login)}
      />
    );
  }

  const imgUrl = generateFileUrl(user.avatar?.url);
  const userName = getUserName(user);
  return (
    <>
      {imgUrl ? (
        <NavAvatar
          btnProps={{
            type: "button",
            "aria-label": "About me",
            onClick(e) {
              setAnchorEle(e.currentTarget);
            },
            className: "w-9 h-9 shrink-0",
          }}
          loader={({ src, width, quality }) =>
            `${src}?w=${width}&q=${quality || 75}`
          }
          priority
          src={imgUrl}
          alt="Avatar"
          width={user.avatar?.width}
          height={user.avatar?.width}
          size={36}
        />
      ) : (
        <DemoAvatar
          as="button"
          aria-label="Demo avatar"
          type="button"
          className="dark:border-secondary-dark h-9 w-9 border-secondary"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            setAnchorEle(e.currentTarget)
          }
        />
      )}

      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={anchorOrigin}
      >
        <div className={className.avatarMenu}>
          <ul className={className.avatarMenuItems}>
            <li className="hover:bg-base-200 dark:hover:bg-base-100">
              <LogoutButton />
            </li>
            <li className="hover:bg-base-200 dark:hover:bg-base-100">
              <Link
                href={ROUTES.accountSettings}
                aria-label="Settings"
                className={className.avatarMenuLink}
              >
                <Settings size={18} />
                <span className="ml-2">Settings</span>
              </Link>
            </li>
          </ul>
          <hr className="my-2 border-t" />
          <Link
            href={ROUTES.authorProfile(user.id)}
            aria-label={userName}
            className={cn(
              className.avatarInfo,
              "hover:bg-base-200 dark:hover:bg-base-100",
            )}
          >
            {imgUrl ? (
              <span className={className.avatarInfoImg}>
                <Image
                  loader={({ src, width, quality }) =>
                    `${src}?w=${width}&q=${quality || 75}`
                  }
                  src={imgUrl}
                  alt={userName || ""}
                  width={32}
                  height={32}
                  objectFit="cover"
                />
              </span>
            ) : (
              <DemoAvatar className="mr-3 h-8 w-8 shrink-0" size={32 / 1.8} />
            )}
            <div className={className.avatarInfoDetail}>
              <p className={className.name}>{userName}</p>
              <span className={className.bio}>{user.email}</span>
            </div>
          </Link>
        </div>
      </Menu>
    </>
  );
}
