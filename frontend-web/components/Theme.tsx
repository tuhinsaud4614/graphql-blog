import * as React from "react";

import { useDarkMode } from "@/hooks";
import { cn } from "@/utils";
import { IAnchorOrigin } from "@/utils/interfaces";
import STYLES from "@/utils/styles";

import Button from "./Button";
import Menu from "./Menu";
import { DarkIcon, LightIcon, SystemIcon } from "./svg";

const className = {
  items: "w-24 list-none m-0 py-1",
  item: "w-full border-none outline-none flex items-center px-2 py-1 hover:bg-base-200 dark:hover:bg-base-dark-100",
  itemIcon: "h-6 w-6 [&_path]:stroke-current",
  itemText: "ml-2 text-sm font-semibold",
};

interface Props {
  anchorOrigin: IAnchorOrigin;
  classes?: {
    root?: string;
    menuRoot?: string;
  };
}

export default function Theme({ anchorOrigin, classes }: Props) {
  const [anchorEle, setAnchorEle] = React.useState<null | HTMLButtonElement>(
    null,
  );
  const { isDarkMode, setTernaryDarkMode, ternaryDarkMode } = useDarkMode();
  return (
    <React.Fragment>
      <Button
        type="button"
        aria-label="Theme"
        className={cn(STYLES.btn.circle, classes?.root)}
        mode="outline"
        onClick={(e) => setAnchorEle(e.currentTarget)}
      >
        {ternaryDarkMode === "light" || !isDarkMode ? (
          <LightIcon className={className.itemIcon} />
        ) : (
          <DarkIcon
            className={cn(
              className.itemIcon,
              "[&>path:nth-last-child(2)]:fill-current",
            )}
          />
        )}
      </Button>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={anchorOrigin}
        classes={{ root: classes?.menuRoot }}
        hideArrow
      >
        <ul className={className.items}>
          <Item
            text="Light"
            active={ternaryDarkMode === "light"}
            onClick={() => {
              setTernaryDarkMode("light");
              setAnchorEle(null);
            }}
          >
            <LightIcon className={className.itemIcon} />
          </Item>
          <Item
            text="Dark"
            active={ternaryDarkMode === "dark"}
            onClick={() => {
              setTernaryDarkMode("dark");
              setAnchorEle(null);
            }}
          >
            <DarkIcon
              className={cn(
                className.itemIcon,
                "[&>path:nth-last-child(2)]:fill-current",
              )}
            />
          </Item>
          <Item
            text="System"
            active={ternaryDarkMode === "system"}
            onClick={() => {
              setTernaryDarkMode("system");
              setAnchorEle(null);
            }}
          >
            <SystemIcon className={className.itemIcon} />
          </Item>
        </ul>
      </Menu>
    </React.Fragment>
  );
}

interface ItemProps {
  text: string;
  children: React.ReactNode;
  onClick?(): void;
  active: boolean;
}

function Item({ active, children, onClick, text }: ItemProps) {
  return (
    <li>
      <button
        aria-label={text}
        type="button"
        className={cn(
          className.item,
          active
            ? "text-accent dark:text-accent-dark"
            : "text-neutral dark:text-neutral-dark",
        )}
        onClick={onClick}
      >
        {children}
        <span className={cn(className.itemText, "text-current")}>{text}</span>
      </button>
    </li>
  );
}
