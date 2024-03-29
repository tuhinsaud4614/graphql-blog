import * as React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { BiBold, BiItalic } from "react-icons/bi";
import { Descendant, Editor, Transforms, createEditor } from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  withReact,
} from "slate-react";

import { Button, SlateElement, SlateLeaf, SlateMarkButton } from "@/components";
import { cn } from "@/utils";

const className = {
  root: "shadow-mine mx-4 mb-5 bg-base-100 dark:bg-base-dark-200 rounded",
  editorBox: "min-h-[6.25rem]",
  editorContainer: "p-3.5",
  controlBox: "flex items-center justify-between px-3.5",
  controlBoxContent: "flex items-center",
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
  submitBtnText?: string;
  onExpanded(value: boolean): void;
  loader?: boolean;
  placeholder?: string;
  disabled?: boolean;
  children?: React.ReactNode;
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
  onExpanded,
  submitBtnText = "Respond",
  disabled = false,
  classes,
  children,
}: Props) {
  const [editor] = React.useState(() =>
    withHistory(withReact(createEditor() as ReactEditor)),
  );

  const renderLeaf = React.useCallback(
    (props: RenderLeafProps) => <SlateLeaf {...props} />,
    [],
  );

  const renderElement = React.useCallback(
    (props: RenderElementProps) => <SlateElement {...props} />,
    [],
  );

  React.useEffect(() => {
    if (!expanded) {
      Transforms.delete(editor, {
        at: {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, []),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded]);

  return (
    <motion.div
      animate={
        expanded
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
      className={cn(className.root, classes?.root)}
    >
      <AnimatePresence>{expanded && children}</AnimatePresence>
      <Slate editor={editor} value={value} onChange={onChange}>
        <section
          className={cn(
            "duration-[400ms]",
            expanded ? className.editorBox : "min-h-[1rem]",
            classes?.editorBox,
          )}
        >
          <div
            className={cn(className.editorContainer, classes?.editorContainer)}
            onClick={() => onExpanded(true)}
          >
            <Editable
              placeholder={placeholder}
              renderLeaf={renderLeaf}
              renderElement={renderElement}
            />
          </div>
        </section>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{
                maxHeight: 100,
                opacity: 1,
              }}
              exit={{ maxHeight: 0, opacity: 0 }}
              transition={{ duration: 0.3, bounce: 0 }}
              className={cn(className.controlBox, classes?.controlBox)}
            >
              <div
                className={cn(
                  className.controlBoxContent,
                  classes?.controlBoxContent,
                )}
              >
                <SlateMarkButton
                  aria-label="Mark bold"
                  hotKey="mod+b"
                  mark="bold"
                  tip="Bold (⌘B)"
                >
                  <BiBold size={18} />
                </SlateMarkButton>
                <SlateMarkButton
                  aria-label="Mark italic"
                  hotKey="mod+i"
                  mark="italic"
                  tip="Italic (⌘I)"
                >
                  <BiItalic size={18} />
                </SlateMarkButton>
              </div>
              <div
                className={cn(
                  className.controlBoxContent,
                  classes?.controlBoxContent,
                )}
              >
                <Button
                  type="button"
                  aria-label="Cancel"
                  className="mr-1 !rounded-full !px-3 text-sm"
                  onClick={() => {
                    onExpanded(false);
                    onChange && onChange(initialValue);
                  }}
                  mode="text"
                  variant="neutral"
                  disabled={loader}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  aria-label={submitBtnText}
                  className="!px-3 text-sm"
                  onClick={onSubmit}
                  loading={loader}
                  disabled={disabled}
                >
                  {submitBtnText}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Slate>
    </motion.div>
  );
}
