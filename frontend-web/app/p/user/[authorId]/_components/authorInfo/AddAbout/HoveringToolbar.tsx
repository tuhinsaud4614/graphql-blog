"use client";

import * as React from "react";

import { Editor, Range, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";

import {
  Portal,
  SlateBlockButton,
  SlateButton,
  SlateMarkButton,
} from "@/components";
import { URL_REGEX } from "@/lib/constants";
import { insertLink, isLinkActive, unwrapLink } from "@/lib/utils";
import { BoldIcon, Heading2Icon, HeadingIcon, ItalicIcon, LinkIcon, XIcon } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";

const className = {
  root: "fixed z-10 -left-[-10000px] -top-[-10000px] bg-base-100 dark:bg-base-dark-200 px-2 py-1.5 rounded-md shadow-mui overflow-hidden",
  container: "flex space-x-2 space-y-2 -ml-2 -mt-2 relative",
  inputBox: "h-full flex items-center bg-base-100 dark:bg-base-dark-200 p-1.5",
  input:
    "flex-1 min-w-0 bg-transparent outline-none pr-1.5 text-neutral dark:text-neutral-dark",
  btn: "outline-none border-none bg-transparent text-error hover:text-error-focus dark:text-error-dark dark:hover:text-error",
};

export default function HoveringToolbar() {
  const [show, setShow] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const editor = useSlate() as ReactEditor;
  const { selection } = editor;

  React.useEffect(() => {
    const handler = () => {
      const el = ref.current;
      if (!el) {
        return;
      }

      if (
        !selection ||
        !ReactEditor.isFocused(editor) ||
        Range.isCollapsed(selection) ||
        Editor.string(editor, selection) === ""
      ) {
        el.removeAttribute("style");
        return;
      }

      if (typeof window === "undefined") {
        return;
      }

      const domSelection = window.getSelection();
      if (!domSelection) {
        return;
      }

      const domRange = domSelection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();
      const elTop = rect.top - el.offsetHeight;
      const elLeft = rect.left - el.offsetWidth / 2 + rect.width / 2;

      el.style.opacity = "1";

      el.style.top = `${elTop < 0 ? 0 : elTop}px`;
      el.style.left = `${elLeft < 0 ? 0 : elLeft}px`;
    };

    handler();

    document.addEventListener("scroll", handler);
    document.addEventListener("resize", handler);

    return () => {
      document.removeEventListener("scroll", handler);
      document.removeEventListener("resize", handler);
    };
  }, [editor, selection]);

  useOnClickOutside(ref as React.RefObject<HTMLDivElement>, () => {
    ref.current?.removeAttribute("style");
  });

  return (
    <Portal>
      <div ref={ref} className={className.root}>
        {show && (
          <div className="absolute inset-0 z-10">
            <div className={className.inputBox}>
              <input
                ref={inputRef}
                name="link"
                type="url"
                aria-label="Type a link"
                placeholder="Type a link..."
                className={className.input}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = inputRef.current?.value;
                    if (value && URL_REGEX.test(value)) {
                      insertLink(editor, value);
                      setShow(false);
                      Transforms.deselect(editor);
                    }
                  }
                }}
              />
              <button
                type="button"
                aria-label="Close"
                className={className.btn}
                onClick={() => setShow(false)}
              >
                <XIcon size={20} />
              </button>
            </div>
          </div>
        )}
        <div className={className.container}>
          <SlateMarkButton
            className="first:ml-1.5 first:mt-1.5"
            aria-label="Mark bold"
            hotKey="mod+b"
            mark="bold"
          >
            <BoldIcon size={18} />
          </SlateMarkButton>
          <SlateMarkButton
            aria-label="Mark italic"
            hotKey="mod+i"
            mark="italic"
          >
            <ItalicIcon size={18} />
          </SlateMarkButton>
          <SlateButton
            aria-label="Insert link"
            onMouseDown={() => {
              if (isLinkActive(editor)) {
                return unwrapLink(editor);
              }
              setShow(true);
            }}
            isActive={isLinkActive(editor)}
          >
            <LinkIcon size={18} />
          </SlateButton>
          <span className="dark:border-base-dark-300 inline-block w-px border-r" />
          <SlateBlockButton aria-label="Block heading 1" format="heading-one">
            <HeadingIcon size={18} />
          </SlateBlockButton>
          <SlateBlockButton aria-label="Block heading 2" format="heading-two">
            <Heading2Icon size={18} />
          </SlateBlockButton>
        </div>
      </div>
    </Portal>
  );
}
