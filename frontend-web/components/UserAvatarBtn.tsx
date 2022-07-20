import { useMediaQuery } from "@hooks";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { BiExit } from "react-icons/bi";
import { BsFillGearFill } from "react-icons/bs";
import { ROUTES } from "utils/constants";
import { IAnchorOrigin } from "utils/interfaces";
import Menu from "./Menu";

const className = {
  avatar: "w-9 h-9 rounded-full overflow-hidden active:scale-95",
  avatarMenu: "w-60 py-2",
  avatarMenuItems: "list-none m-0 flex flex-col",
  avatarMenuLink:
    "w-full outline-none border-none flex items-center px-4 py-2 text-sm hover:bg-base-200 text-neutral hover:text-accent active:scale-95",
  avatarInfo: "flex px-4 hover:bg-base-200 py-2 group",
  avatarInfoImg: "w-8 h-8 inline-block rounded-full overflow-hidden mr-3",
  avatarInfoDetail: "flex flex-col",
};

interface Props {
  hideOnSmallDevice?: boolean;
  anchorOrigin: IAnchorOrigin;
}

export default function UserAvatarBtn({
  hideOnSmallDevice = false,
  anchorOrigin,
}: Props) {
  const [anchorEle, setAnchorEle] = useState<null | HTMLButtonElement>(null);

  const matches = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (hideOnSmallDevice && !matches) {
      setAnchorEle(null);
    }
  }, [matches, hideOnSmallDevice]);

  return (
    <Fragment>
      <button
        aria-label="About me"
        className={className.avatar}
        type="button"
        onClick={(e) => setAnchorEle(e.currentTarget)}
      >
        <Image
          src="/demo.png"
          alt="Avatar"
          width={32}
          height={32}
          objectFit="cover"
          layout="responsive"
          className="rounded-full"
        />
      </button>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={anchorOrigin}
      >
        <div className={className.avatarMenu}>
          <ul className={className.avatarMenuItems}>
            <li>
              <button
                type="button"
                aria-label="Logout"
                className={className.avatarMenuLink}
              >
                <BiExit size={18} />
                <span className="ml-2">Logout</span>
              </button>
            </li>
            <li>
              <Link href={ROUTES.accountSettings} passHref>
                <a aria-label="Settings" className={className.avatarMenuLink}>
                  <BsFillGearFill size={18} />
                  <span className="ml-2">Settings</span>
                </a>
              </Link>
            </li>
          </ul>
          <hr className="border-t my-2" />
          <Link href={ROUTES.authorProfile("1")} passHref>
            <a className={className.avatarInfo}>
              <span aria-label="Avatar" className={className.avatarInfoImg}>
                <Image
                  src="/demo.png"
                  alt="Avatar"
                  width={32}
                  height={32}
                  layout="responsive"
                  objectFit="cover"
                />
              </span>
              <div className={className.avatarInfoDetail}>
                <p className="pb-1 text-sm line-clamp-1 text-ellipsis text-neutral group-hover:text-accent">
                  Nothing name
                </p>
                <span className="text-xs line-clamp-1 text-ellipsis text-neutral/60 group-hover:text-accent">
                  Nothing name
                </span>
              </div>
            </a>
          </Link>
        </div>
      </Menu>
    </Fragment>
  );
}
