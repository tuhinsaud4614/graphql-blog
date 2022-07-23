import { useEventListener, useTooltip } from "@hooks";
import isHotkey from "is-hotkey";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import Button from "./Button";
import { isMarkActive, MarkButtonProps } from "./utils";

export default function MarkButton({
  hotKey,
  mark,
  tip,
  ...rest
}: MarkButtonProps) {
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
          type:
            match || isMarkActive(editor, "code") ? "paragraph" : "code-block",
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
