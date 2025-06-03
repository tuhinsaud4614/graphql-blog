"use client";

import isHotkey from "is-hotkey";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";


import useTooltip from "@/hooks/useTooltip";
import { isBlockActive, isMarkActive } from "@/lib/utils";
import { useEventListener } from "usehooks-ts";
import { MarkButtonProps } from "./PostEditor/utils";
import SlateButton from "./SlateButton";

export default function SlateMarkButton({
  hotKey,
  mark,
  tip,
  ...rest
}: Readonly<MarkButtonProps>) {
  const editor = useSlate();
  const { onHoverEnd, onHoverStart } = useTooltip();
  const isActive = isMarkActive(editor, mark);

  const handler = () => {
    if (mark !== "code") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return editor.addMark(mark, !isActive);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [match] = Editor.nodes(editor, {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      match: (n) => n.type === "code",
    });
    Transforms.setNodes(
      editor,
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        type: match ? "paragraph" : "code",
      },
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      { match: (n) => Editor.isBlock(editor, n) },
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
