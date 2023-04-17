import * as React from "react";

import { BiUnlink } from "react-icons/bi";
import { FiExternalLink } from "react-icons/fi";
import { Range } from "slate";
import {
  RenderElementProps,
  useFocused,
  useReadOnly,
  useSelected,
  useSlateStatic,
} from "slate-react";

import { unwrapLink } from "@/utils";

import Menu from "./Menu";

const className = {
  popup:
    "absolute z-10 left-0 flex items-center py-1.5 px-2.5 border rounded-md bg-base-100 dark:bg-base-dark-200",
  popupLink:
    "flex items-center text-primary dark:text-primary-dark hover:text-primary-focus dark:hover:text-primary text-sm border-r pr-2.5 cursor-pointer select-none",
  unlink:
    "select-none ml-2.5 text-neutral dark:text-neutral-dark hover:text-accent dark:hover:text-accent-dark active:scale-95",
};

export default function SlateLink({
  attributes,
  children,
  element,
}: RenderElementProps) {
  const ref = React.useRef<HTMLAnchorElement | null>(null);
  const editor = useSlateStatic();
  const isReadOnly = useReadOnly();
  const selected = useSelected();
  const focused = useFocused();
  const extra = isReadOnly ? { rel: "noreferrer", target: "_blank" } : {};

  return (
    <React.Fragment>
      <a
        {...attributes}
        ref={ref}
        //   @ts-ignore
        href={element.url}
        className="text-neutral underline dark:text-neutral-dark"
        {...extra}
      >
        {children}
      </a>
      <Menu
        anchorEle={ref.current}
        open={
          !isReadOnly &&
          !!editor.selection &&
          !Range.isCollapsed(editor.selection) &&
          selected &&
          focused
        }
        hideArrow
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <div
          className="flex items-center px-2.5 py-1.5"
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          <a
            rel="noreferrer"
            target="_blank"
            // @ts-ignore
            href={element.url}
            className={className.popupLink}
          >
            <FiExternalLink size={18} />
            {/* @ts-ignore */}
            <span className="ml-1.5">{element.url}</span>
          </a>
          <button
            aria-label="remove"
            type="button"
            className={className.unlink}
            onClick={() => unwrapLink(editor)}
          >
            <BiUnlink size={18} />
          </button>
        </div>
      </Menu>
    </React.Fragment>
  );
}
// <div className={className.popup} contentEditable={false}>

// </div>
