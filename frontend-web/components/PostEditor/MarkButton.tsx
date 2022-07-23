import { useEventListener, useTooltip } from "@hooks";
import isHotkey from "is-hotkey";
import { ComponentPropsWithoutRef } from "react";
import { BaseEditor, Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import Button from "./Button";

const isMarkActive = (editor: BaseEditor, format: string) => {
  const marks = Editor.marks(editor);
  //   @ts-ignore
  return marks ? marks[format] === true : false;
};

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
} as const;

type HotKeyType = keyof typeof HOTKEYS;
type MarkType = typeof HOTKEYS[HotKeyType];

interface Props extends ComponentPropsWithoutRef<"button"> {
  mark: MarkType;
  hotKey: HotKeyType;
  tip: string;
}

export default function MarkButton({ hotKey, mark, tip, ...rest }: Props) {
  const editor = useSlate();
  const { onHoverEnd, onHoverStart } = useTooltip();
  const isActive = isMarkActive(editor, mark);

  const handler = () => {
    if (mark === "code") {
      // @ts-ignore
      const [match] = Editor.nodes(editor, {
        // @ts-ignore
        match: (n) => n.type === "code-block",
      });
      // Toggle the block type depending on whether there's already a match.
      Transforms.setNodes(
        editor,
        {
          // @ts-ignore
          type: match ? "paragraph" : "code-block",
        },
        { match: (n) => Editor.isBlock(editor, n) }
      );
    }
    editor.addMark(mark, !isActive);
  };

  useEventListener("keydown", (e) => {
    if (isHotkey(hotKey, e)) {
      handler();
    }
  });

  return (
    <Button
      {...rest}
      onClick={handler}
      onMouseEnter={(e) => {
        onHoverStart(e, {
          text: tip,
          anchorOrigin: { vertical: "top", horizontal: "center" },
          className: "px-2 py-1.5",
        });
      }}
      onMouseLeave={() => {
        onHoverEnd();
      }}
      isActive={isActive}
    >
      {rest.children}
    </Button>
  );
}
