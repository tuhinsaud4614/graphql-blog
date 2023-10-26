"user client";

import * as React from "react";

import { MoonStar, Sun, Tv2 } from "lucide-react";
import { useTheme } from "next-themes";

import STYLES from "@/lib/styles";
import { IAnchorOrigin } from "@/lib/types";
import { cn } from "@/lib/utils";

import Button from "../ui/Button";
import Menu from "../ui/Menu";
import ThemeSwitchItem from "./Item";

const className = {
  items: "w-24 list-none m-0 py-1",
  item: "w-full border-none outline-none flex items-center px-2 py-1 hover:bg-base-200 dark:hover:bg-base-100",
  itemIcon: "h-5 w-5 text-current",
  itemText: "ml-2 text-sm font-semibold",
};

interface Props {
  anchorOrigin: IAnchorOrigin;
  classes?: {
    root?: string;
    menuRoot?: string;
  };
}

export default function ThemeSwitch({ anchorOrigin, classes }: Props) {
  const [anchorEle, setAnchorEle] = React.useState<null | HTMLButtonElement>(
    null,
  );
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <React.Fragment>
      <Button
        type="button"
        aria-label="Theme"
        className={cn(STYLES.btn.circle, classes?.root)}
        mode="outline"
        onClick={(e) => setAnchorEle(e.currentTarget)}
      >
        {resolvedTheme === "light" ? (
          <Sun className={className.itemIcon} />
        ) : (
          <MoonStar className={cn(className.itemIcon)} />
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
          <ThemeSwitchItem
            text="Light"
            active={theme === "light"}
            onClick={() => {
              setTheme("light");
              setAnchorEle(null);
            }}
          >
            <Sun className={className.itemIcon} />
          </ThemeSwitchItem>
          <ThemeSwitchItem
            text="Dark"
            active={theme === "dark"}
            onClick={() => {
              setTheme("dark");
              setAnchorEle(null);
            }}
          >
            <MoonStar className={cn(className.itemIcon)} />
          </ThemeSwitchItem>
          <ThemeSwitchItem
            text="System"
            active={theme === "system"}
            onClick={() => {
              setTheme("system");
              setAnchorEle(null);
            }}
          >
            <Tv2 className={className.itemIcon} />
          </ThemeSwitchItem>
        </ul>
      </Menu>
    </React.Fragment>
  );
}
