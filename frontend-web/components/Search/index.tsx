import { useMediaQuery } from "@hooks";
import { Menu, SearchBox } from "components";
import { ChangeEvent, Fragment, useRef, useState } from "react";
import Result from "./Result";
import ResultItem from "./ResultItem";

const className = {
  searchBox: "py-8",
  result: "w-80 p-4",
};

export default function Search() {
  const [anchorEle, setAnchorEle] = useState<null | HTMLDivElement>(null);
  const searchRef = useRef<null | HTMLDivElement>(null);

  const matches = useMediaQuery("(min-width: 1024px)");

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length >= 1) {
      setAnchorEle(searchRef.current);
    } else {
      setAnchorEle(null);
    }
  };

  return (
    <Fragment>
      <SearchBox
        rootRef={searchRef}
        onChange={changeHandler}
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
              <ResultItem link="/account/profile" src="/favicon.ico">
                Blake Lemoine
              </ResultItem>
              <ResultItem link="/account/profile" src="/favicon.ico">
                Blake Lemoine
              </ResultItem>
              <ResultItem link="/account/profile" src="/favicon.ico">
                Blake Lemoine
              </ResultItem>
            </Result>
            <span className="h-3 block" />
            <Result title="Posts">
              <ResultItem link="/account/profile" src="/logo.svg">
                Blake Lemoine
              </ResultItem>
              <ResultItem link="/account/profile" src="/logo.svg">
                Blake Lemoine
              </ResultItem>
              <ResultItem link="/account/profile" src="/logo.svg">
                Blake Lemoine
              </ResultItem>
            </Result>
            <span className="h-3 block" />
            <Result title="tags">
              <ResultItem link="/account/profile" src="/tag.svg">
                Blake Lemoine
              </ResultItem>
              <ResultItem link="/account/profile" src="/tag.svg">
                Blake Lemoine
              </ResultItem>
              <ResultItem link="/account/profile" src="/tag.svg">
                Blake Lemoine
              </ResultItem>
            </Result>
          </section>
        </Menu>
      )}
    </Fragment>
  );
}
