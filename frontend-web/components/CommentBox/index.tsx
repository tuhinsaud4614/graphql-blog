import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useCallback, useState } from "react";
import { BiBold, BiItalic } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";
import { createEditor, Descendant, Editor, Transforms } from "slate";
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
  root: "shadow-mine-2 mx-4 mb-5 bg-base-100 rounded",
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

const initialValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

interface Props {
  expanded?: boolean;
  value?: Descendant[];
  onChange?(value: Descendant[]): void;
  onSubmit?(): void;
  onCancel?(): void;
  loader?: boolean;
  placeholder?: string;
  disabled?: boolean;
  children?: ReactNode;
  classes?: {
    root?: string;
    editorBox?: string;
    editorContainer?: string;
    controlBox?: string;
    controlBoxContent?: string;
    cancelBtn?: string;
    respondBtn?: string;
    respondBtnLoader?: string;
    respondBtnSpin?: string;
  };
}

export default function CommentBox({
  expanded = false,
  onChange,
  value = initialValue,
  loader = false,
  placeholder = "What are your thoughts?",
  onSubmit,
  onCancel,
  disabled = false,
  classes,
  children,
}: Props) {
  const [expand, setExpand] = useState(expanded);
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
    <motion.div
      animate={
        expand
          ? {
              paddingTop: 14,
              paddingBottom: 14,
              transition: {
                duration: 0.4,
              },
            }
          : {
              paddingTop: 0,
              paddingBottom: 0,
              transition: {
                duration: 0.4,
              },
            }
      }
      className={classNames(className.root, classes?.root)}
    >
      <AnimatePresence>{expand && children}</AnimatePresence>
      <Slate editor={editor} value={value} onChange={onChange}>
        <section
          className={classNames(
            "duration-[400ms]",
            expand ? className.editorBox : "min-h-[1rem]",
            classes?.editorBox
          )}
        >
          <div
            className={classNames(
              className.editorContainer,
              classes?.editorContainer
            )}
            onClick={() => setExpand(true)}
          >
            <Editable placeholder={placeholder} renderLeaf={renderElement} />
          </div>
        </section>
        <AnimatePresence>
          {expand && (
            <motion.div
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{
                maxHeight: 100,
                opacity: 1,
              }}
              exit={{ maxHeight: 0, opacity: 0 }}
              transition={{ duration: 0.3, bounce: 0 }}
              className={classNames(className.controlBox, classes?.controlBox)}
            >
              <div
                className={classNames(
                  className.controlBoxContent,
                  classes?.controlBoxContent
                )}
              >
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
              <div
                className={classNames(
                  className.controlBoxContent,
                  classes?.controlBoxContent
                )}
              >
                <button
                  type="button"
                  aria-label="Cancel"
                  className={classNames(
                    className.cancelBtn,
                    classes?.cancelBtn
                  )}
                  onClick={() => {
                    if (onCancel) {
                      return onCancel();
                    }
                    setExpand(false);
                    onChange && onChange(initialValue);
                    Transforms.delete(editor, {
                      at: {
                        anchor: Editor.start(editor, []),
                        focus: Editor.end(editor, []),
                      },
                    });
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  aria-label="Respond"
                  onClick={onSubmit}
                  className={classNames(
                    className.respondBtn,
                    loader && className.respondBtnLoader,
                    classes?.respondBtn
                  )}
                  disabled={disabled}
                >
                  Respond
                  {loader && (
                    <ImSpinner2 className={className.respondBtnSpin} />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Slate>
    </motion.div>
  );
}
