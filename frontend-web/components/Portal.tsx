"use client";

import * as React from "react";

import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  targetElement?: HTMLElement; // Optional target element for the portal
}

const Portal = ({ children, targetElement }: Props) => {
  const [mounted, setMounted] = React.useState(false);

  React.useLayoutEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const portalTarget = targetElement || (mounted && globalThis?.document?.body);

  return createPortal(children, portalTarget);
};

export default Portal;
