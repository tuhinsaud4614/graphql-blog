import classNames from "classnames";
import { ReactNode, useCallback, useState } from "react";
import { BiBold, BiItalic } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";
import { createEditor, Descendant } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  ReactEditor,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";
import FormatButton from "./FormatButton";

const className = {
  root: "shadow-mine-2 mx-4 mb-5 py-3.5 bg-base-100 rounded",
  editorBox: "min-h-[6.25rem]",
  editorContainer: "p-3.5",
  controlBox: "flex items-center justify-between px-3.5",
  controlBoxContent: "flex items-center",
  cancelBtn: "outline-none border-none px-3 py-1.5 text-neutral text-sm",
  respondBtn:
    "outline-none border-0 px-3 py-1.5 rounded-full inline-block text-sm bg-accent hover:bg-accent-focus text-base-200 hover:text-base-100 enabled:active:scale-95 disabled:bg-accent/30 disabled:text-neutral/50 disabled:cursor-not-allowed",
  respondBtnLoader: "flex items-center justify-center",
  respondBtnSpin: "text-white animate-spin ml-2 text-sm",
};

interface Props {
  value?: Descendant[];
  onChange?(value: Descendant[]): void;
  onSubmit?(): void;
  loader?: boolean;
  placeholder?: string;
  disabled?: boolean;
  children?: ReactNode;
}

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

export default function CommentBox({
  onChange,
  value = initialValue,
  loader = false,
  placeholder = "What are your thoughts?",
  onSubmit,
  disabled = false,
  children,
}: Props) {
  const [editor] = useState(() =>
    withHistory(withReact(createEditor() as ReactEditor))
  );

  const renderElement = useCallback(
    ({ attributes, children, leaf }: RenderLeafProps) => {
      // @ts-ignore
      if (leaf.bold) {
        children = <strong {...attributes}>{children}</strong>;
      }

      // @ts-ignore
      if (leaf.italic) {
        children = <em {...attributes}>{children}</em>;
      }

      return <span {...attributes}>{children}</span>;
    },
    []
  );

  return (
    <div className={className.root}>
      {children}
      <Slate editor={editor} value={value} onChange={onChange}>
        <section className={className.editorBox}>
          <div className={className.editorContainer}>
            <Editable placeholder={placeholder} renderLeaf={renderElement} />
          </div>
        </section>
        <div className={className.controlBox}>
          <div className={className.controlBoxContent}>
            <FormatButton
              aria-label="Format bold"
              hotKey="mod+b"
              mark="bold"
              tip="Bold (⌘B)"
            >
              <BiBold size={21} />
            </FormatButton>
            <FormatButton
              aria-label="Format italic"
              hotKey="mod+i"
              mark="italic"
              tip="Italic (⌘I)"
            >
              <BiItalic size={21} />
            </FormatButton>
          </div>
          <div className={className.controlBoxContent}>
            <button
              type="button"
              aria-label="Cancel"
              className={className.cancelBtn}
            >
              Cancel
            </button>
            <button
              type="button"
              aria-label="Respond"
              onClick={onSubmit}
              className={classNames(
                className.respondBtn,
                loader && className.respondBtnLoader
              )}
              disabled={disabled}
            >
              Respond
              {loader && <ImSpinner2 className={className.respondBtnSpin} />}
            </button>
          </div>
        </div>
      </Slate>
    </div>
  );
}
