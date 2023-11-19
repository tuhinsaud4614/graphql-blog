import type { ButtonModeType, ColorVariantType } from "./types";
import { cn } from "./utils";

const className = {
  btn: {
    root: "px-4 py-1.5 rounded-full select-none flex items-center justify-center active:scale-95 transition-all ease-custom hover:[&_svg]:ease-icon [&_svg]:transition-transform",
    circle: "h-9 w-9 rounded-full !p-0",
    fill: "outline-none border-0",
    fillEnabled: "shadow-mui hover:shadow-mui-hover active:shadow-mui-active",
    text: "outline-none border-0 bg-transparent select-none rounded",
    loading: "flex items-center justify-center",
    spin: "text-inherit animate-spin ml-2 text-sm",
    disabled(mode: ButtonModeType = "outline") {
      let style =
        "disabled:border-black/[12%] dark:disabled:border-white/[12%]";
      if (mode === "fill") {
        style = "disabled:bg-black/[12%] dark:disabled:bg-white/[12%]";
      }
      return cn(
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:text-black/[26%] dark:disabled:text-white/[26%]",
        style,
      );
    },
    dynamic(variant: ColorVariantType, mode: ButtonModeType = "outline") {
      switch (variant) {
        case "primary":
          if (mode === "outline") {
            return "border-primary/50 text-primary hover:border-primary hover:bg-primary/5 dark:text-primary-content dark:border-primary-content/50 dark:hover:bg-primary-content/[8%] dark:hover:border-primary-content";
          }
          if (mode === "text") {
            return "text-primary hover:bg-primary/5 dark:text-primary-content dark:hover:bg-primary-content/[8%]";
          }
          return "bg-primary hover:bg-primary-focus text-base-100 dark:hover:bg-primary dark:text-black/[87%]";
        case "secondary":
          if (mode === "outline") {
            return "border-secondary/50 text-secondary hover:border-secondary hover:bg-secondary/5 dark:text-secondary-content dark:border-secondary-content/50 dark:hover:bg-secondary-content/[8%] dark:hover:border-secondary-content";
          }
          if (mode === "text") {
            return "text-secondary hover:bg-secondary/5 dark:text-secondary-content dark:hover:bg-secondary-content/[8%]";
          }
          return "bg-secondary hover:bg-secondary-focus text-base-100 dark:hover:bg-secondary dark:text-black/[87%]";
        case "error":
          if (mode === "outline") {
            return "border-error/50 text-error hover:border-error hover:bg-error/5 dark:text-error-content dark:border-error-content/50 dark:hover:bg-error-content/[8%] dark:hover:border-error-content";
          }
          if (mode === "text") {
            return "text-error hover:bg-error/5 dark:text-error-content dark:hover:bg-error-content/[8%]";
          }
          return "bg-error hover:bg-error-focus text-base-100 dark:hover:bg-error dark:text-base-100/[87%]";
        case "success":
          if (mode === "outline") {
            return "border-success/50 text-success hover:border-success hover:bg-success/5 dark:text-success-content dark:border-success-content/50 dark:hover:bg-success-content/[8%] dark:hover:border-success-content";
          }
          if (mode === "text") {
            return "text-success hover:bg-success/5 dark:text-success-content dark:hover:bg-success-content/[8%]";
          }
          return "bg-success hover:bg-success-focus text-base-100 dark:hover:bg-success dark:text-black/[87%]";
        case "warning":
          if (mode === "outline") {
            return "border-warning/50 text-warning hover:border-warning hover:bg-warning/5 dark:text-warning-content dark:border-warning-content/50 dark:hover:bg-warning-content/[8%] dark:hover:border-warning-content";
          }
          if (mode === "text") {
            return "text-warning hover:bg-warning/5 dark:text-warning-content dark:hover:bg-warning-content/[8%]";
          }
          return "bg-warning hover:bg-warning-focus text-base-100 dark:hover:bg-warning dark:text-black/[87%]";
        case "info":
          if (mode === "outline") {
            return "border-info/50 text-info hover:border-info hover:bg-info/5 dark:text-info-content dark:border-info-content/50 dark:hover:bg-info-content/[8%] dark:hover:border-info-content";
          }
          if (mode === "text") {
            return "text-info hover:bg-info/5 dark:text-info-content dark:hover:bg-info-content/[8%]";
          }
          return "bg-info hover:bg-info-focus text-base-100 dark:hover:bg-info dark:text-black/[87%]";
        case "neutral":
          if (mode === "outline") {
            return "border-neutral/50 text-neutral hover:border-neutral hover:bg-neutral/5 dark:text-neutral-dark dark:border-neutral-dark/50 dark:hover:bg-neutral-dark/[8%] dark:hover:border-neutral-dark";
          }
          if (mode === "text") {
            return "text-neutral hover:bg-neutral/5 dark:text-neutral-dark dark:hover:bg-neutral-dark/[8%]";
          }
          return "bg-neutral hover:bg-neutral-focus text-base-100 dark:hover:bg-neutral-dark-focus dark:text-black/[87%]";
        default:
          if (mode === "outline") {
            return "border-accent/50 text-accent hover:border-accent hover:bg-accent/5 dark:text-accent-content dark:border-accent-content/50 dark:hover:bg-accent-content/[8%] dark:hover:border-accent-content";
          }
          if (mode === "text") {
            return "text-accent hover:bg-accent/5 dark:text-accent-content dark:hover:bg-accent-content/[8%]";
          }
          return "bg-accent hover:bg-accent-focus text-base-100 dark:hover:bg-accent dark:text-black/[87%]";
      }
    },
  },
  indicator: {
    root: "relative inline-flex w-max",
    item: "absolute bottom-auto left-auto right-0 top-0 z-[1] -translate-y-1/2 translate-x-1/2 whitespace-nowrap",
    start: "right-auto left-0 -translate-x-1/2",
    center: "right-1/2 left-1/2",
    middle: "top-1/2 bottom-1/2",
    bottom: "top-auto bottom-0 translate-y-1/2",
  },
  mask: {
    root: "[mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]",
    squircle:
      "[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMTAwIDBDMjAgMCAwIDIwIDAgMTAwczIwIDEwMCAxMDAgMTAwIDEwMC0yMCAxMDAtMTAwUzE4MCAwIDEwMCAwWicvPjwvc3ZnPg==)]",
    hexagon:
      "[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTgyJyBoZWlnaHQ9JzIwMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNLjMgNjUuNDg2YzAtOS4xOTYgNi42ODctMjAuMDYzIDE0LjIxMS0yNS4wNzhsNjEuODYtMzUuOTQ2YzguMzYtNS4wMTYgMjAuODk5LTUuMDE2IDI5LjI1OCAwbDYxLjg2IDM1Ljk0NmM4LjM2IDUuMDE1IDE0LjIxMSAxNS44ODIgMTQuMjExIDI1LjA3OHY3MS4wNTVjMCA5LjE5Ni02LjY4NyAyMC4wNjMtMTQuMjExIDI1LjA3OWwtNjEuODYgMzUuOTQ1Yy04LjM2IDQuMTgtMjAuODk5IDQuMTgtMjkuMjU4IDBMMTQuNTEgMTYxLjYyQzYuMTUxIDE1Ny40NC4zIDE0NS43MzcuMyAxMzYuNTRWNjUuNDg2WicgZmlsbD0nYmxhY2snIGZpbGwtcnVsZT0nbm9uemVybycvPjwvc3ZnPg==)]",
    hexagon2:
      "[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzE4MicgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNNjQuNzg2IDE4MS40Yy05LjE5NiAwLTIwLjA2My02LjY4Ny0yNS4wNzktMTQuMjFMMy43NjIgMTA1LjMzYy01LjAxNi04LjM2LTUuMDE2LTIwLjkgMC0yOS4yNTlsMzUuOTQ1LTYxLjg2QzQ0LjcyMyA1Ljg1MSA1NS41OSAwIDY0Ljc4NiAwaDcxLjA1NWM5LjE5NiAwIDIwLjA2MyA2LjY4OCAyNS4wNzkgMTQuMjExbDM1Ljk0NSA2MS44NmM0LjE4IDguMzYgNC4xOCAyMC44OTkgMCAyOS4yNThsLTM1Ljk0NSA2MS44NmMtNC4xOCA4LjM2LTE1Ljg4MyAxNC4yMTEtMjUuMDc5IDE0LjIxMUg2NC43ODZaJyBmaWxsPSdibGFjaycgZmlsbC1ydWxlPSdub256ZXJvJy8+PC9zdmc+)]",
    triangle:
      "[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTc0JyBoZWlnaHQ9JzE0OScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBmaWxsPSdibGFjaycgZD0nbTg3IDE0OC40NzYtODYuNjAzLjE4NUw0My44NiA3NC40MjMgODcgMGw0My4xNCA3NC40MjMgNDMuNDYzIDc0LjIzOHonIGZpbGwtcnVsZT0nZXZlbm9kZCcvPjwvc3ZnPg==)]",
    heart:
      "[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzE4NScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBkPSdNMTAwIDE4NC42MDZhMTUuMzg0IDE1LjM4NCAwIDAgMS04LjY1My0yLjY3OEM1My41NjUgMTU2LjI4IDM3LjIwNSAxMzguNjk1IDI4LjE4MiAxMjcuNyA4Ljk1MiAxMDQuMjY0LS4yNTQgODAuMjAyLjAwNSA1NC4xNDYuMzA4IDI0LjI4NyAyNC4yNjQgMCA1My40MDYgMGMyMS4xOTIgMCAzNS44NjkgMTEuOTM3IDQ0LjQxNiAyMS44NzlhMi44ODQgMi44ODQgMCAwIDAgNC4zNTYgMEMxMTAuNzI1IDExLjkyNyAxMjUuNDAyIDAgMTQ2LjU5NCAwYzI5LjE0MiAwIDUzLjA5OCAyNC4yODcgNTMuNCA1NC4xNTEuMjYgMjYuMDYxLTguOTU2IDUwLjEyMi0yOC4xNzYgNzMuNTU0LTkuMDIzIDEwLjk5NC0yNS4zODMgMjguNTgtNjMuMTY1IDU0LjIyOGExNS4zODQgMTUuMzg0IDAgMCAxLTguNjUzIDIuNjczWicgZmlsbD0nYmxhY2snIGZpbGwtcnVsZT0nbm9uemVybycvPjwvc3ZnPg==)]",
    decagon:
      "[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTkyJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBmaWxsPSdibGFjaycgZD0nbTk2IDAgNTguNzc5IDE5LjA5OCAzNi4zMjcgNTB2NjEuODA0bC0zNi4zMjcgNTBMOTYgMjAwbC01OC43NzktMTkuMDk4LTM2LjMyNy01MFY2OS4wOThsMzYuMzI3LTUweicgZmlsbC1ydWxlPSdldmVub2RkJy8+PC9zdmc+)]",
    pentagon:
      "[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTkyJyBoZWlnaHQ9JzE4MScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBmaWxsPSdibGFjaycgZD0nbTk2IDAgOTUuMTA2IDY5LjA5OC0zNi4zMjcgMTExLjgwNEgzNy4yMkwuODk0IDY5LjA5OHonIGZpbGwtcnVsZT0nZXZlbm9kZCcvPjwvc3ZnPg==)]",
    diamond:
      "[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBmaWxsPSdibGFjaycgZD0nbTEwMCAwIDEwMCAxMDAtMTAwIDEwMEwwIDEwMHonIGZpbGwtcnVsZT0nZXZlbm9kZCcvPjwvc3ZnPg==)]",
    star: "[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTkyJyBoZWlnaHQ9JzE4MCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBmaWxsPSdibGFjaycgZD0nbTk2IDEzNy4yNjMtNTguNzc5IDQyLjAyNCAyMi4xNjMtNjguMzg5TC44OTQgNjguNDgxbDcyLjQ3Ni0uMjQzTDk2IDBsMjIuNjMgNjguMjM4IDcyLjQ3Ni4yNDMtNTguNDkgNDIuNDE3IDIyLjE2MyA2OC4zODl6JyBmaWxsLXJ1bGU9J2V2ZW5vZGQnLz48L3N2Zz4=)]",
    star2:
      "[mask-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTkyJyBoZWlnaHQ9JzE4MCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cGF0aCBmaWxsPSdibGFjaycgZD0nbTk2IDE1My4wNDQtNTguNzc5IDI2LjI0MyA3LjAyLTYzLjUxM0wuODk0IDY4LjQ4MWw2My4xMTctMTMuMDFMOTYgMGwzMS45ODkgNTUuNDcyIDYzLjExNyAxMy4wMS00My4zNDcgNDcuMjkyIDcuMDIgNjMuNTEzeicgZmlsbC1ydWxlPSdldmVub2RkJy8+PC9zdmc+)]",
  },
  zIndex: {
    header: "z-[500]",
    sidebarBackdrop: "z-[501]",
    sidebar: "z-[502]",
    backdrop: "z-[901]",
    modal: "z-[902]",
    menuBackdrop: "z-[950]",
    menu: "z-[951]",
  },
} as const;

const STYLES = className;

export default STYLES;
