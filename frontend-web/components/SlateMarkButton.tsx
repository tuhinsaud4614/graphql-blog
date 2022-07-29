import { useEventListener, useTooltip } from "@hooks";
import isHotkey from "is-hotkey";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import { isBlockActive, isMarkActive } from "utils";
import { MarkButtonProps } from "./PostEditor/utils";
import SlateButton from "./SlateButton";

export default function SlateMarkButton({
  hotKey,
  mark,
  tip,
  ...rest
}: MarkButtonProps) {
  const editor = useSlate();
  const { onHoverEnd, onHoverStart } = useTooltip();
  const isActive = isMarkActive(editor, mark);

  const handler = () => {
    if (mark !== "code") {
      return editor.addMark(mark, !isActive);
    }

    // @ts-ignore
    const [match] = Editor.nodes(editor, {
      // @ts-ignore
      match: (n) => n.type === "code",
    });
    Transforms.setNodes(
      editor,
      {
        // @ts-ignore
        type: match ? "paragraph" : "code",
      },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  };

  useEventListener("keydown", (e) => {
    if (isHotkey(hotKey, e)) {
      handler();
    }
  });

  return (
    <SlateButton
      {...rest}
      onClick={handler}
      onMouseEnter={(e) => {
        tip &&
          onHoverStart(e, {
            text: tip,
            anchorOrigin: { vertical: "top", horizontal: "center" },
            className: "px-2 py-1.5",
          });
      }}
      onMouseLeave={() => {
        tip && onHoverEnd();
      }}
      isActive={isActive || (mark === "code" && isBlockActive(editor, mark))}
    >
      {rest.children}
    </SlateButton>
  );
}
