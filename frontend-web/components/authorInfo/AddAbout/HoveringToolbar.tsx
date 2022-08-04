import { useOnClickOutside } from "@hooks";
import {
  Portal,
  SlateBlockButton,
  SlateButton,
  SlateMarkButton,
} from "components";
import { useEffect, useRef, useState } from "react";
import { BiBold, BiHeading, BiItalic, BiLink, BiX } from "react-icons/bi";
import { CgFormatHeading } from "react-icons/cg";
import { Editor, Range, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import { insertLink, isLinkActive, unwrapLink } from "utils";
import { URL_REGEX } from "utils/constants";

const className = {
  root: "fixed z-10 -left-[-10000px] -top-[-10000px] bg-base-100 dark:bg-base-dark-200 px-2 py-1.5 rounded-md shadow-mui overflow-hidden",
  container: "flex space-x-2 space-y-2 -ml-2 -mt-2 relative",
  inputBox: "h-full flex items-center bg-base-100 dark:bg-base-dark-200 p-1.5",
  input:
    "flex-1 min-w-0 bg-transparent outline-none pr-1.5 text-neutral dark:text-neutral-dark",
  btn: " outline-none border-none bg-transparent text-error hover:text-error-focus dark:text-error-dark dark:hover:text-error",
};

export default function HoveringToolbar() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const editor = useSlate() as ReactEditor;
  const { selection } = editor;

  useEffect(() => {
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

  useOnClickOutside(ref, () => {
    ref.current?.removeAttribute("style");
  });

  return (
    <Portal>
      <div ref={ref} className={className.root}>
        {show && (
          <div className="absolute z-10 inset-0">
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
                <BiX size={20} />
              </button>
            </div>
          </div>
        )}
        <div className={className.container}>
          <SlateMarkButton aria-label="Mark bold" hotKey="mod+b" mark="bold">
            <BiBold size={18} />
          </SlateMarkButton>
          <SlateMarkButton
            aria-label="Mark italic"
            hotKey="mod+i"
            mark="italic"
          >
            <BiItalic size={18} />
          </SlateMarkButton>
          <SlateButton
            aria-label="Insert link"
            onMouseDown={(e) => {
              if (isLinkActive(editor)) {
                return unwrapLink(editor);
              }
              setShow(true);
            }}
            isActive={isLinkActive(editor)}
          >
            <BiLink size={18} />
          </SlateButton>
          <span className="inline-block w-[1px] border-r dark:border-base-dark-300" />
          <SlateBlockButton aria-label="Block heading 1" format="heading-one">
            <BiHeading size={18} />
          </SlateBlockButton>
          <SlateBlockButton aria-label="Block heading 2" format="heading-two">
            <CgFormatHeading size={18} />
          </SlateBlockButton>
        </div>
      </div>
    </Portal>
  );
}
