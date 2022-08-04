import * as React from "react";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
}

const isBrowser = typeof window !== "undefined";

const Portal = ({ children }: Props) => {
  if (!isBrowser) {
    return null;
  }

  return createPortal(
    children,
    document.getElementById("presentational") as HTMLElement
  );
};

export default Portal;
