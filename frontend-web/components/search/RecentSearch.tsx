import classNames from "classnames";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { BiX } from "react-icons/bi";

const className = {
  root: "",
  title:
    "my-6 text-neutral-focus font-bold line-clamp-1 text-ellipsis md:leading-[3.25rem] text-xl md:text-[2.625rem]",
  items: "list-none m-0 flex flex-col",
  divider: "block w-full border-b mt-2 mb-3",
  item: "flex justify-between items-center text-neutral",
  btn: "outline-none border-none active:scale-95",
  clear: "text-error",
};

export default function RecentSearch() {
  const { replace } = useRouter();
  return (
    <>
      <h1 className={className.title}>Recent searches</h1>
      <ul className={className.items}>
        {Array.from({ length: 10 }).map((_, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 && <li className={className.divider} />}
              <li className={className.item}>
                <button
                  aria-label={`history-${index}`}
                  type="button"
                  className={className.btn}
                  onClick={() => {
                    replace(encodeURI(`/search?q=h-${index}`));
                  }}
                >
                  h-{index}
                </button>
                <button
                  aria-label="Clear"
                  type="button"
                  className={classNames(className.btn, className.clear)}
                >
                  <BiX size={28} />
                </button>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </>
  );
}
