import escapeHtml from "escape-html";
import { Text } from "slate";
import { IAnchorOrigin } from "./interfaces";

const ARROW_SIZE = 14;
export const getPositions = (
  anchorRect: DOMRect | null,
  selfRect: DOMRect | null,
  anchorOrigin: IAnchorOrigin,
  fraction?: boolean | number,
  hideArrow?: boolean
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

// Set to local storage
export const setLocalStorage = <T>(key: string, value: T) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const item = window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing localStorage ???${key}???:`, error);
  }
};

// regex replace replace classes?: "min-w-[0]"; to classes?:string; -> \?:\s"(.*)"

// Serialize comment form slate editor
export const commentSerialize = (node: any) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    // @ts-ignore
    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }

    // @ts-ignore
    if (node.italic) {
      string = `<em>${string}</em>`;
    }

    return string;
  }

  //   @ts-ignore
  const children = node.children.map((n) => commentSerialize(n)).join("");
  return children;
};

export const maxFileSize = (mb: number) => mb * 1000000;

function gcd(width: number, height: number): number {
  return height == 0 ? width : gcd(height, width % height);
}

export function aspectRatio(width: number, height: number) {
  const result = gcd(width, height);

  return { left: width / result, right: height / result } as const;
}
