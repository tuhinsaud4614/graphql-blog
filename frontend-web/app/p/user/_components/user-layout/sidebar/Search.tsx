"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import SearchBox from "@/components/SearchBox";
import Menu from "@/components/ui/Menu";
import useLocalStorage from "@/hooks/useLocalStorage";
import useMediaQuery from "@/hooks/useMediaQuery";
import { RECENT_SEARCHES_KEY, ROUTES } from "@/lib/constants";

import SearchResult from "./Result";
import SearchResultItem from "./ResultItem";

const className = {
  searchBox: "py-8",
  result: "w-80 p-4",
};

export default function SidebarSearch() {
  const [anchorEle, setAnchorEle] =
    React.useState<React.ElementRef<"div"> | null>(null);
  const [_, setRecentSearches] = useLocalStorage<string[] | null>(
    RECENT_SEARCHES_KEY,
    null,
  );
  const searchRef = React.useRef<React.ElementRef<"div">>(null);
  const inputRef = React.useRef<React.ElementRef<"input">>(null);

  const { push } = useRouter();

  const matches = useMediaQuery("(min-width: 1024px)");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 1) {
      setAnchorEle(searchRef.current);
    } else {
      setAnchorEle(null);
    }
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    <>
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
            <SearchResult title="People">
              {Array.from({ length: 3 }).map((_, index) => (
                <SearchResultItem
                  key={index}
                  link={ROUTES.user.userProfile((index + 1).toString())}
                  src="/logo.svg"
                >
                  Blake Lemoine
                </SearchResultItem>
              ))}
            </SearchResult>
            <span className="block h-3" />
            <SearchResult title="Posts">
              {Array.from({ length: 3 }).map((_, index) => (
                <SearchResultItem key={index} link="/my-home" src="/logo.svg">
                  Blake Lemoine
                </SearchResultItem>
              ))}
            </SearchResult>
            <span className="block h-3" />
            <SearchResult title="tags">
              <SearchResultItem link="/my-home" src="/tag.svg">
                Blake Lemoine
              </SearchResultItem>
              <SearchResultItem link="/my-home" src="/tag.svg">
                Blake Lemoine
              </SearchResultItem>
              <SearchResultItem link="/my-home" src="/tag.svg">
                Blake Lemoine
              </SearchResultItem>
            </SearchResult>
          </section>
        </Menu>
      )}
    </>
  );
}
