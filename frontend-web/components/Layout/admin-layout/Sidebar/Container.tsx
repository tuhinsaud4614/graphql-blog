import classNames from "classnames";
import * as React from "react";

import MobileView from "./MobileView";

const className = {
  root: "fixed left-0 top-0 z-[1103] h-screen bg-primary",
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
      className={classNames(className.root, "w-[17.5rem]")}
      onClose={onClose}
    >
      {children}
    </MobileView>
  );
}
