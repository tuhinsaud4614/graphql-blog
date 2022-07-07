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

  if (anchorOrigin.horizontal === "right" && fraction) {
    FRACTION = typeof fraction === "boolean" ? 0.89 : fraction;
  } else if (anchorOrigin.horizontal === "left" && fraction) {
    FRACTION = typeof fraction === "boolean" ? 0.11 : fraction;
  } else if (anchorOrigin.horizontal === "left" && !fraction) {
    FRACTION = 0;
  }

  if (anchorRect) {
    const selfWidth = selfRect ? selfRect.width : 0;
    const selfHeight = selfRect ? selfRect.height : 0;
    selfLeft = anchorRect.left - selfWidth * FRACTION;
    selfTop = hideArrow
      ? anchorRect.bottom + 4
      : anchorRect.bottom + ARROW_SIZE;

    arrowLeft = anchorRect.left + (anchorRect.width - ARROW_SIZE) / 2;
    arrowTop = anchorRect.bottom + ARROW_SIZE / 2;

    if (anchorOrigin.horizontal === "center") {
      selfLeft = anchorRect.left - (selfWidth - anchorRect.width) / 2;
    } else if (anchorOrigin.horizontal === "right") {
      selfLeft = anchorRect.right - selfWidth * FRACTION;
    }

    if (anchorOrigin.vertical === "top") {
      selfTop = anchorRect.top - selfHeight - (hideArrow ? 4 : ARROW_SIZE);
      arrowTop = anchorRect.top - ARROW_SIZE * 1.5;
    }
  }

  return {
    selfLeft,
    selfTop,
    arrowLeft,
    arrowTop,
  };
};

// Set to local storage
export const setLocalStorage = <T>(key: string, value: T) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const item = window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing localStorage “${key}”:`, error);
  }
};
