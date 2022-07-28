import classNames from "classnames";
import * as React from "react";
import { BiX } from "react-icons/bi";

const className = {
  root: "flex items-center justify-between px-4 py-2.5 border-b rounded-tl-2xl rounded-tr-2xl",
  btn: "text-error hover:text-error-focus dark:text-error-dark dark:hover:text-error active:scale-95 flex items-center justify-center p-1 rounded-full",
};

interface Props extends React.ComponentPropsWithRef<"header"> {
  classes?: { root?: string; closeBtn?: string };
  onClose?(): void;
}

export default function ModalHeader({
  onClose,
  classes,
  children,
  ...rest
}: Props) {
  return (
    <header
      {...rest}
      className={classNames(
        className.root,
        !children && "!justify-end",
        classes?.root,
        rest.className
      )}
    >
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className={classNames(
            className.btn,

            classes?.closeBtn
          )}
          aria-label="Modal-Close"
        >
          <BiX size={24} />
        </button>
      )}
    </header>
  );
}
