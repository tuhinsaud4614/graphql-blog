"use client";

import * as React from "react";

import Image from "next/legacy/image";
import Link from "next/link";

import { LogOutIcon, SettingsIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import useLogout from "@/hooks/useLogout";
import useUser from "@/hooks/useUser";
import { ROUTES } from "@/lib/constants";
import { IAnchorOrigin } from "@/lib/types";
import { generateFileUrl, getUserName, gplErrorHandler } from "@/lib/utils";

import { useRouter } from "next/navigation";
import ClientOnly from "./ClientOnly";
import DemoAvatar from "./DemoAvatar";
import ErrorModal from "./ErrorModal";
import Menu from "./Menu";
import NavAvatar from "./NavAvatar";

const className = {
  avatarMenu: "w-60 py-2",
  avatarMenuItems: "list-none m-0 flex flex-col",
  avatarMenuLink:
    "w-full outline-none border-none flex items-center px-4 py-2 text-sm hover:bg-base-200 dark:hover:bg-base-dark-200 text-neutral dark:text-neutral-dark hover:text-accent dark:hover:text-accent-dark",
  avatarInfo:
    "flex px-4 hover:bg-base-200 dark:hover:bg-base-dark-200 py-2 group",
  avatarInfoImg:
    "shrink-0 w-8 h-8 inline-block rounded-full overflow-hidden border dark:border-none dark:ring-1 dark:group-hover:ring-2 dark:ring-secondary-dark mr-3",
  avatarInfoDetail: "flex flex-col",
  name: "pb-1 text-sm line-clamp-1 text-ellipsis text-neutral dark:text-neutral-dark dark:group-hover:text-accent-dark",
  bio: "text-xs line-clamp-1 text-ellipsis text-neutral/60 dark:text-neutral-dark/60 group-hover:text-accent dark:group-hover:text-accent-dark",
};

interface Props {
  hideOnSmallDevice?: boolean;
  anchorOrigin: IAnchorOrigin;
}

export default function UserAvatarBtn({
  hideOnSmallDevice = false,
  anchorOrigin,
}: Readonly<Props>) {
  const user = useUser();
  const [anchorEle, setAnchorEle] = React.useState<null | HTMLButtonElement>(
    null,
  );
  const matches = useMediaQuery("(min-width: 1024px)");
  const {push} = useRouter();

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
        type="button"
        className="dark:border-secondary-dark size-9 border-secondary"
        onClick={() => push(ROUTES.account.login)}
      />
    );
  }

  const imgUrl = generateFileUrl(user.avatar?.url);
  const userName = getUserName(user);
  return (
    <React.Fragment>
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
            `${src}?w=${width}&q=${quality ?? 75}`
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
          className="dark:border-secondary-dark size-9 border-secondary"
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
            <ClientOnly>
              <li>
                <Logout />
              </li>
            </ClientOnly>
            <li>
              <Link
                href={ROUTES.user.settings}
                aria-label="Settings"
                className={className.avatarMenuLink}
              >
                <SettingsIcon size={18} />
                <span className="ml-2">Settings</span>
              </Link>
            </li>
          </ul>
          <hr className="my-2 border-t" />
          <Link
            href={ROUTES.user.userProfile(user.id)}
            aria-label={userName}
            className={className.avatarInfo}
          >
            {imgUrl ? (
              <span className={className.avatarInfoImg}>
                <Image
                  loader={({ src, width, quality }) =>
                    `${src}?w=${width}&q=${quality ?? 75}`
                  }
                  src={imgUrl}
                  alt={userName ?? ""}
                  width={32}
                  height={32}
                  layout="responsive"
                  objectFit="cover"
                />
              </span>
            ) : (
              <DemoAvatar className="mr-3 size-8 shrink-0" size={32 / 1.8} />
            )}
            <div className={className.avatarInfoDetail}>
              <p className={className.name}>{userName}</p>
              <span className={className.bio}>{user.email}</span>
            </div>
          </Link>
        </div>
      </Menu>
    </React.Fragment>
  );
}

function Logout() {
  const { error, loading, logoutHandler, reset } = useLogout();
  return (
    <React.Fragment>
      <button
        type="button"
        aria-label="Logout"
        className={className.avatarMenuLink}
        disabled={loading}
        onClick={logoutHandler}
      >
        <LogOutIcon size={18} />
        <span className="ml-2">Logout</span>
      </button>
      <ErrorModal
        onClose={() => reset()}
        title="Logout Errors"
        errors={gplErrorHandler(error)}
      />
    </React.Fragment>
  );
}
