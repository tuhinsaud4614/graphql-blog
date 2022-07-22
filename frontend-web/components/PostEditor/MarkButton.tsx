import { useEventListener, useTooltip } from "@hooks";
import isHotkey from "is-hotkey";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { useSlate } from "slate-react";
import Button from "./Button";

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
  const [isActive, setIsActive] = useState(false);
  const editor = useSlate();
  const { onHoverEnd, onHoverStart } = useTooltip();

  useEffect(() => {
    editor.addMark(mark, isActive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, editor]);

  useEventListener("keydown", (e) => {
    if (isHotkey(hotKey, e)) {
      setIsActive((prev) => !prev);
    }
  });

  return (
    <Button
      {...rest}
      onClick={() => {
        setIsActive((prev) => !prev);
      }}
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
    />
  );
}
