import { useEventListener, useTooltip } from "@hooks";
import classNames from "classnames";
import isHotkey from "is-hotkey";
import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { useSlate } from "slate-react";

const className = {
  root: "mx-1 p-1.5 rounded flex items-center justify-center",
  rootState: (status: boolean) =>
    status ? "bg-green-50 text-green-500" : "text-neutral/60 hover:bg-zinc-100",
};

const HOT_KEYS = ["mod+b", "mod+i"] as const;
const MARKS = ["bold", "italic"] as const;

interface Props extends ComponentPropsWithoutRef<"button"> {
  mark: typeof MARKS[number];
  hotKey: typeof HOT_KEYS[number];
  tip: string;
}

export default function FormatButton({ hotKey, mark, tip, ...rest }: Props) {
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
    <button
      {...rest}
      type="button"
      onClick={() => {
        setIsActive((prev) => !prev);
      }}
      className={classNames(
        className.root,
        className.rootState(isActive),
        rest.className
      )}
      onMouseEnter={(e) => {
        onHoverStart(e, {
          text: tip,
          anchorOrigin: { vertical: "top", horizontal: "center" },
          className: "px-3 py-2",
        });
      }}
      onMouseLeave={() => {
        onHoverEnd();
      }}
    />
  );
}
