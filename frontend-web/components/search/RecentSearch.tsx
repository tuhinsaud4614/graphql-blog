import { useIsomorphicLayoutEffect, useLocalStorage } from "@hooks";
import classNames from "classnames";
import { useRouter } from "next/router";
import { Fragment, useRef } from "react";
import { BiX } from "react-icons/bi";
import { RECENT_SEARCHES } from "utils/constants";

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
  const isRender = useRef(false);
  const [recentSearches, setRecentSearches] = useLocalStorage<string[] | null>(
    RECENT_SEARCHES,
    null
  );
  let result;

  useIsomorphicLayoutEffect(() => {
    isRender.current = true;
  }, []);

  if (!isRender.current) {
    return null;
  }

  if (recentSearches === null || recentSearches.length === 0) {
    result = <p className="text-neutral">You have no recent searches</p>;
  } else {
    result = (
      <ul className={className.items}>
        {recentSearches.map((value, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 && <li className={className.divider} />}
              <li className={className.item}>
                <button
                  aria-label={`history-${index}`}
                  type="button"
                  className={className.btn}
                  onClick={() => {
                    replace(encodeURI(`/search?q=${value}`));
                  }}
                >
                  {value}
                </button>
                <button
                  aria-label="Clear"
                  type="button"
                  className={classNames(className.btn, className.clear)}
                  onClick={() => {
                    setRecentSearches((prev) => {
                      const old =
                        prev && prev?.filter((old) => old !== prev[index]);
                      return old;
                    });
                  }}
                >
                  <BiX size={28} />
                </button>
              </li>
            </Fragment>
          );
        })}
      </ul>
    );
  }
  return (
    <div>
      <h1 className={className.title}>Recent searches</h1>
      {result}
    </div>
  );
}
