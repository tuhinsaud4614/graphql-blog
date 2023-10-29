import * as React from "react";

import { IAnchorOrigin } from "@/lib/types";

const ARROW_SIZE = 14;

export const getPositions = (
  anchorRect: DOMRect | null,
  selfRect: DOMRect | null,
  anchorOrigin: IAnchorOrigin,
  fraction?: boolean | number,
  hideArrow?: boolean,
) => {
  let selfLeft = 0;
  let selfTop = 0;
  let arrowLeft = 0;
  let arrowTop = 0;
  let FRACTION = 1;

  let vertical: IAnchorOrigin["vertical"] = anchorOrigin.vertical;

  if (anchorRect) {
    const selfWidth = selfRect ? selfRect.width : 0;
    const selfHeight = selfRect ? selfRect.height : 0;
    arrowLeft = anchorRect.left + (anchorRect.width - ARROW_SIZE) / 2;

    // Horizontal start
    const hasLeftSpace = selfWidth < anchorRect.left;
    const hasRightSpace = window.innerWidth > anchorRect.right + selfWidth;

    let horizontal: IAnchorOrigin["horizontal"] = anchorOrigin.horizontal;

    if (anchorOrigin.horizontal === "left" && !hasRightSpace && hasLeftSpace) {
      horizontal = "right";
    } else if (
      anchorOrigin.horizontal === "right" &&
      !hasLeftSpace &&
      hasRightSpace
    ) {
      horizontal = "left";
    }

    if (horizontal === "right" && fraction) {
      FRACTION = typeof fraction === "boolean" ? 0.89 : fraction;
    } else if (horizontal === "left" && fraction) {
      FRACTION = typeof fraction === "boolean" ? 0.11 : fraction;
    } else if (horizontal === "left" && !fraction) {
      FRACTION = 0;
    }

    if (horizontal === "left") {
      selfLeft = anchorRect.left - selfWidth * FRACTION;
    } else if (horizontal === "right") {
      selfLeft = anchorRect.right - selfWidth * FRACTION;
    } else if (horizontal === "center") {
      selfLeft = anchorRect.left - (selfWidth - anchorRect.width) / 2;
    }
    // Horizontal End

    // Vertical Start
    const hasTopSpace =
      selfHeight + (hideArrow ? 4 : ARROW_SIZE) < anchorRect.top;

    const hasBottomSpace =
      window.innerHeight >
      anchorRect.bottom + selfHeight + (hideArrow ? 4 : ARROW_SIZE);

    if (anchorOrigin.vertical === "top" && !hasTopSpace && hasBottomSpace) {
      vertical = "bottom";
    } else if (
      anchorOrigin.vertical === "bottom" &&
      !hasBottomSpace &&
      hasTopSpace
    ) {
      vertical = "top";
    }

    if (vertical === "top") {
      selfTop = anchorRect.top - selfHeight - (hideArrow ? 4 : ARROW_SIZE);
      arrowTop = anchorRect.top - ARROW_SIZE * 1.5;
    } else if (vertical === "bottom") {
      selfTop = hideArrow
        ? anchorRect.bottom + 4
        : anchorRect.bottom + ARROW_SIZE;
      arrowTop = anchorRect.bottom + ARROW_SIZE / 2;
    }
    // Vertical End
  }

  return {
    selfLeft,
    selfTop,
    arrowLeft,
    arrowTop,
    vertical,
  } as const;
};

interface Props {
  open: boolean;
  anchorOrigin: IAnchorOrigin;
  anchorEle?: null | Element;
  fraction?: boolean | number;
  hideArrow?: boolean;
}

export default function usePopup<T extends HTMLElement>({
  anchorEle,
  open,
  anchorOrigin,
  fraction,
  hideArrow,
}: Props) {
  const [anchorRect, setAnchorRect] = React.useState<DOMRect | null>(null);
  const [selfRect, setSelfRect] = React.useState<DOMRect | null>(null);
  const ref = React.useRef<T | null>(null);

  React.useLayoutEffect(() => {
    if (!anchorEle) {
      return;
    }
    const handler = () => {
      setAnchorRect(anchorEle.getBoundingClientRect());
    };

    handler();
    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler);
    };
  }, [anchorEle]);

  React.useLayoutEffect(() => {
    const ele = ref.current;
    if (open && ele) {
      const rect = ele.getBoundingClientRect();

      if (selfRect?.width !== rect.width || selfRect?.height !== rect.height) {
        setSelfRect(rect);
      }
    }
  }, [open, anchorRect, selfRect?.width, selfRect?.height]);

  const { arrowLeft, arrowTop, selfLeft, selfTop } = getPositions(
    anchorRect,
    selfRect,
    anchorOrigin,
    fraction,
    hideArrow,
  );

  return {
    popupLeft: selfLeft,
    popupTop: selfTop,
    arrowLeft: arrowLeft,
    arrowTop: arrowTop,
    popupRef: ref,
  } as const;
}
