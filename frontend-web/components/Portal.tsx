"use client";

import * as React from "react";

import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
}

const Portal = ({ children }: Props) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return mounted ? createPortal(<>{children}</>, document.body) : null;
};

export default Portal;
