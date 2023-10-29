"user client";

import * as React from "react";

import { MoonStar, Sun, Tv2 } from "lucide-react";
import { useTheme } from "next-themes";

import useTooltip from "@/hooks/useTooltip";
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
  tooltipOrigin?: IAnchorOrigin;
  classes?: {
    root?: string;
    menuRoot?: string;
  };
}

export default function ThemeSwitch({
  anchorOrigin,
  tooltipOrigin,
  classes,
}: Props) {
  const [anchorEle, setAnchorEle] =
    React.useState<React.ElementRef<"button">>();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { onHoverEnd, onHoverStart } = useTooltip();

  return (
    <React.Fragment>
      <Button
        type="button"
        aria-label="Theme"
        className={cn(STYLES.btn.circle, classes?.root)}
        mode="outline"
        onClick={(e) => setAnchorEle(e.currentTarget)}
        onMouseEnter={(e) => {
          onHoverStart(e, {
            text: "Switch Theme",
            anchorOrigin: {
              vertical: tooltipOrigin?.vertical || "bottom",
              horizontal: tooltipOrigin?.horizontal || "center",
            },
            className: "p-1",
          });
        }}
        onMouseLeave={() => {
          onHoverEnd();
        }}
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
        onClose={() => setAnchorEle(undefined)}
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
              setAnchorEle(undefined);
            }}
          >
            <Sun className={className.itemIcon} />
          </ThemeSwitchItem>
          <ThemeSwitchItem
            text="Dark"
            active={theme === "dark"}
            onClick={() => {
              setTheme("dark");
              setAnchorEle(undefined);
            }}
          >
            <MoonStar className={cn(className.itemIcon)} />
          </ThemeSwitchItem>
          <ThemeSwitchItem
            text="System"
            active={theme === "system"}
            onClick={() => {
              setTheme("system");
              setAnchorEle(undefined);
            }}
          >
            <Tv2 className={className.itemIcon} />
          </ThemeSwitchItem>
        </ul>
      </Menu>
    </React.Fragment>
  );
}
