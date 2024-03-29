import * as React from "react";

import { BaseEditor, Editor, Element as SlateElement, Transforms } from "slate";
import { useSlate } from "slate-react";

import { SlateButton } from "@/components";
import { useTooltip } from "@/hooks";
import { isBlockActive } from "@/utils";

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const TEXT_ALIGN_TYPES = ["left", "center", "right", "justify"];

type FormatType =
  | "heading-one"
  | "heading-two"
  | "block-quote"
  | "numbered-list"
  | "bulleted-list"
  | "left"
  | "center"
  | "right"
  | "justify";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
  format: FormatType;
  tip?: string;
}

export default function BlockButton({ format, tip, ...rest }: Props) {
  const editor = useSlate();
  const { onHoverEnd, onHoverStart } = useTooltip();

  return (
    <SlateButton
      {...rest}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
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
      isActive={isBlockActive(editor, format)}
    />
  );
}

const toggleBlock = (editor: BaseEditor, format: FormatType) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? "align" : "type",
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      // @ts-ignore
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      // @ts-ignore
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      // @ts-ignore
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};
