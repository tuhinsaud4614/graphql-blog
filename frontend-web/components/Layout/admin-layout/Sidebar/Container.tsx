import * as React from "react";

import classNames from "classnames";

import STYLES from "@/utils/styles";

import MobileView from "./MobileView";

const className = {
  root: "fixed left-0 top-0 h-screen bg-primary",
};

interface Props {
  visible: boolean;
  matches: boolean;
  onClose?(): void;
}

export default function Container({
  matches,
  visible,
  children,
  onClose,
}: React.PropsWithChildren<Props>) {
  if (matches) {
    return (
      <aside
        className={classNames(
          className.root,
          STYLES.zIndex.sidebar,
          "group duration-200 ease-in",
          visible ? "w-[17.5rem]" : "w-[5.375rem] hover:w-[17.5rem]",
        )}
      >
        {children}
      </aside>
    );
  }

  return (
    <MobileView
      visible={visible}
      className={classNames(
        className.root,
        STYLES.zIndex.sidebar,
        "w-[17.5rem]",
      )}
      onClose={onClose}
    >
      {children}
    </MobileView>
  );
}
