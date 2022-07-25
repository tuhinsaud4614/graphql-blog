import { ComponentPropsWithoutRef } from "react";
import { BaseEditor, Editor, Element as SlateElement, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { IMAGE_URL_REGEX } from "utils/constants";

export const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
} as const;

export type HotKeyType = keyof typeof HOTKEYS;
export type MarkType = typeof HOTKEYS[HotKeyType];

export interface MarkButtonProps extends ComponentPropsWithoutRef<"button"> {
  mark: MarkType;
  hotKey: HotKeyType;
  tip: string;
}

export const isMarkActive = (editor: BaseEditor, format: string) => {
  const marks = Editor.marks(editor);
  //   @ts-ignore
  return marks ? marks[format] === true : false;
};

export function isBlockActive(
  editor: BaseEditor,
  format: string,
  blockType = "type"
) {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        // @ts-ignore
        n[blockType] === format,
    })
  );

  return !!match;
}

export const isImageUrl = (url: string) => {
  if (!url) return false;
  if (url.match(IMAGE_URL_REGEX) === null) return false;
  return true;
};

export const insertImage = (editor: ReactEditor, url: string) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

export const withImages = (editor: ReactEditor) => {
  const { isVoid, insertData } = editor;

  editor.isVoid = (element) => {
    // @ts-ignore
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data) => {
    const text = data.getData("text/plain");
    if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};
