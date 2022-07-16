import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "utils/constants";

const className = {
  userTile: "flex items-center justify-between",
  userTileLeft: "flex items-start min-w-0 flex-1",
  userTileAuthorName:
    "font-medium text-sm text-neutral hover:text-neutral active:scale-95 line-clamp-1 text-ellipsis",
  userTileAuthorAbout:
    "text-xs text-neutral/60 line-clamp-1 text-ellipsis mt-1",
  userTileImg: "w-10 h-10 inline-block rounded-full overflow-hidden mr-5",
  followBtn:
    "outline-none px-3.5 py-1.5 rounded-full text-sm text-center inline-block active:scale-95",
  followBtnBlock:
    "border-0 bg-accent hover:bg-accent-focus text-base-200 hover:text-base-100",
  followBtnOutline:
    "border border-accent hover:border-accent-focus text-accent hover:text-accent-focus",
};

export default function ReactorItem() {
  return (
    <li className={className.userTile}>
      <div className={className.userTileLeft}>
        <span className={className.userTileImg}>
          <Image
            src="/demo.png"
            alt="Avatar"
            width={88}
            height={88}
            layout="responsive"
            objectFit="cover"
          />
        </span>
        <span className="flex flex-col min-w-0 flex-1">
          <Link href={ROUTES.authorProfile("1")} passHref>
            <a
              aria-label="Author Profile"
              className={className.userTileAuthorName}
            >
              Nothing
            </a>
          </Link>
          <p className={className.userTileAuthorAbout}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum
            deleniti quam mollitia quaerat quos! Aut molestias sit nesciunt
            dolores assumenda nam suscipit eum, voluptatum cupiditate voluptas
            corporis temporibus dolorum quo.
          </p>
        </span>
      </div>
      <button
        aria-label="Follow"
        type="button"
        className={classNames(
          className.followBtn,
          className[true ? "followBtnBlock" : "followBtnOutline"]
        )}
      >
        Follow
      </button>
    </li>
  );
}
