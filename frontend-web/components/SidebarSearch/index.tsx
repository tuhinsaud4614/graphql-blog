import { useLocalStorage, useMediaQuery } from "@hooks";
import { Menu, SearchBox } from "components";
import { useRouter } from "next/router";
import { ChangeEvent, Fragment, KeyboardEvent, useRef, useState } from "react";
import { RECENT_SEARCHES_KEY, ROUTES } from "utils/constants";
import Result from "./Result";
import ResultItem from "./ResultItem";

const className = {
  searchBox: "py-8",
  result: "w-80 p-4",
};

export default function Search() {
  const [anchorEle, setAnchorEle] = useState<null | HTMLDivElement>(null);
  const [_, setRecentSearches] = useLocalStorage<string[] | null>(
    RECENT_SEARCHES_KEY,
    null
  );
  const searchRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const { push } = useRouter();

  const matches = useMediaQuery("(min-width: 1024px)");

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 1) {
      setAnchorEle(searchRef.current);
    } else {
      setAnchorEle(null);
    }
  };

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      if (inputRef.current.value.trim()) {
        setRecentSearches((prev) => {
          if (inputRef.current) {
            return prev
              ? [...prev, inputRef.current.value]
              : [inputRef.current?.value];
          }
          return prev;
        });
      }
      push(`/search?q=${inputRef.current.value}`);
    }
  };

  return (
    <Fragment>
      <SearchBox
        ref={inputRef}
        rootRef={searchRef}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
        classes={{ root: className.searchBox }}
      />
      {matches && (
        <Menu
          open={Boolean(anchorEle)}
          anchorEle={anchorEle}
          onClose={() => setAnchorEle(null)}
        >
          <section className={className.result}>
            <Result title="People">
              {Array.from({ length: 3 }).map((_, index) => (
                <ResultItem
                  key={index}
                  link={ROUTES.authorProfile((index + 1).toString())}
                  src="/favicon.ico"
                >
                  Blake Lemoine
                </ResultItem>
              ))}
            </Result>
            <span className="h-3 block" />
            <Result title="Posts">
              {Array.from({ length: 3 }).map((_, index) => (
                <ResultItem key={index} link="/my-home" src="/logo.svg">
                  Blake Lemoine
                </ResultItem>
              ))}
            </Result>
            <span className="h-3 block" />
            <Result title="tags">
              <ResultItem link="/my-home" src="/tag.svg">
                Blake Lemoine
              </ResultItem>
              <ResultItem link="/my-home" src="/tag.svg">
                Blake Lemoine
              </ResultItem>
              <ResultItem link="/my-home" src="/tag.svg">
                Blake Lemoine
              </ResultItem>
            </Result>
          </section>
        </Menu>
      )}
    </Fragment>
  );
}
