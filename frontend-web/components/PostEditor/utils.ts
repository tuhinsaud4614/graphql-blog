import { ComponentPropsWithoutRef } from "react";

export const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
} as const;

export type EmptyText = {
  text: string;
};
export type HotKeyType = keyof typeof HOTKEYS;
export type MarkType = typeof HOTKEYS[HotKeyType];

export interface MarkButtonProps extends ComponentPropsWithoutRef<"button"> {
  mark: MarkType;
  hotKey: HotKeyType;
  tip?: string;
}
