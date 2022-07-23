import { ComponentPropsWithoutRef } from "react";
import { BaseEditor, Editor } from "slate";

export const CODE_LANGUAGES = [
  "js",
  "typescript",
  "python",
  "html",
  "php",
  "sql",
  "css",
  "java",
  "bash",
] as const;

export type CodeLanguageType = typeof CODE_LANGUAGES[number] | null;

export const isMarkActive = (editor: BaseEditor, format: string) => {
  const marks = Editor.marks(editor);
  //   @ts-ignore
  return marks ? marks[format] === true : false;
};

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
