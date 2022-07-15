import React from "react";
import { getPositions } from "utils";
import { IAnchorOrigin } from "utils/interfaces";

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
    }: Props
  ) => {
    if (!tooltipEle.current) {
      tooltipEle.current = document.createElement("span");
      tooltipEle.current.innerHTML = `${text}`;
      tooltipEle.current.ariaLabel = `Tooltip`;
      tooltipEle.current.className = "tooltip";
    }

    appendInDom(tooltipEle.current);

    const currEle = e.currentTarget;
    const { arrowLeft, arrowTop, selfLeft, selfTop } = getPositions(
      currEle.getBoundingClientRect(),
      tooltipEle.current.getBoundingClientRect(),
      anchorOrigin,
      false,
      hideArrow
    );

    tooltipEle.current.style.left = `${selfLeft}px`;
    tooltipEle.current.style.top = `${selfTop}px`;
    if (!arrowEle.current && !hideArrow) {
      arrowEle.current = document.createElement("span");
      arrowEle.current.className =
        "fixed bg-neutral transform rotate-45 w-3.5 h-3.5";

      appendInDom(arrowEle.current);
      arrowEle.current.style.zIndex = "998";
      arrowEle.current.style.left = `${arrowLeft}px`;
      arrowEle.current.style.top = `${arrowTop}px`;
    }
    tooltipEle.current.classList.add("animate-tooltip");
    arrowEle.current?.classList.add("animate-tooltipArrow");

    // Add extra class name
    const extraCls = cls?.replace(/\s+/g, " ").trim().split(" ");
    if (extraCls && extraCls.length) {
      tooltipEle.current.classList.add(...extraCls);
    }
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
