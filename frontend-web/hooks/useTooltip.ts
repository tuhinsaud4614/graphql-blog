import * as React from "react";

import { getPositions } from "@/utils";
import { IAnchorOrigin } from "@/utils/interfaces";

const className = {
  tip: "fixed select-none z-[999] w-auto px-1.5 py-1 min-w-max rounded-sm text-base-100 dark:text-base-dark-100 bg-neutral dark:bg-base-dark-300 text-xs font-bold",
  arrow:
    "fixed bg-neutral dark:bg-base-dark-300 transform rotate-45 w-3.5 h-3.5 z-[998]",
};

interface Props {
  anchorOrigin?: IAnchorOrigin;
  hideArrow?: boolean;
  className?: string;
  text: React.ReactNode;
}

const appendInDom = (node: HTMLSpanElement) => {
  const presentational = document.getElementById("tooltip");
  if (presentational) {
    presentational.appendChild(node);
  } else {
    document.body.appendChild(node);
  }
};

export default function useTooltip() {
  const tooltipEle = React.useRef<HTMLSpanElement | null>(null);
  const arrowEle = React.useRef<HTMLSpanElement | null>(null);

  const clearHandler = () => {
    if (arrowEle.current) {
      arrowEle.current.remove();
      arrowEle.current = null;
    }
    if (tooltipEle.current) {
      tooltipEle.current.remove();
      tooltipEle.current = null;
    }
  };

  const onHoverStart = <T extends HTMLElement>(
    e: React.MouseEvent<T>,
    {
      text,
      anchorOrigin = { horizontal: "center", vertical: "bottom" },
      hideArrow = false,
      className: cls,
    }: Props,
  ) => {
    if (!tooltipEle.current) {
      tooltipEle.current = document.createElement("span");
      tooltipEle.current.innerHTML = `${text}`;
      tooltipEle.current.ariaLabel = `Tooltip`;
      tooltipEle.current.className = className.tip;
      // Add extra class name
      const extraCls = cls?.replace(/\s+/g, " ").trim().split(" ");
      if (extraCls && extraCls.length) {
        tooltipEle.current.classList.add(...extraCls);
      }
    }

    appendInDom(tooltipEle.current);

    const currEle = e.currentTarget;
    const { arrowLeft, arrowTop, selfLeft, selfTop, vertical } = getPositions(
      currEle.getBoundingClientRect(),
      tooltipEle.current.getBoundingClientRect(),
      anchorOrigin,
      false,
      hideArrow,
    );

    tooltipEle.current.style.left = `${selfLeft}px`;
    tooltipEle.current.style.top = `${selfTop}px`;
    if (!arrowEle.current && !hideArrow) {
      arrowEle.current = document.createElement("span");
      tooltipEle.current.ariaLabel = `Tooltip arrow`;
      arrowEle.current.className = className.arrow;

      appendInDom(arrowEle.current);
      arrowEle.current.style.left = `${arrowLeft}px`;
      arrowEle.current.style.top = `${arrowTop}px`;
    }
    tooltipEle.current.classList.add(
      vertical && vertical === "top"
        ? "animate-toolTopTip"
        : "animate-toolBottomTip",
    );
    arrowEle.current?.classList.add(
      vertical && vertical === "top"
        ? "animate-tooltipTopArrow"
        : "animate-tooltipBottomArrow",
    );
  };

  const onHoverEnd = () => {
    clearHandler();
  };

  React.useEffect(() => {
    return clearHandler;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tooltipEle.current, arrowEle.current]);

  return { onHoverStart, onHoverEnd } as const;
}
