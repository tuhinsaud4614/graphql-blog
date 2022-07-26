import { useTooltip } from "@hooks";
import { BiUnlink } from "react-icons/bi";
import { ReactEditor, useSlateStatic } from "slate-react";
import { isLinkActive, unwrapLink } from "utils";
import Button from "./Button";

const className = {
  content: "bg-base-100 w-56 p-2",
};

export default function UnLinkButton() {
  const editor = useSlateStatic() as ReactEditor;
  const { onHoverEnd, onHoverStart } = useTooltip();

  const onClick = () => {
    if (isLinkActive(editor)) {
      unwrapLink(editor);
    }
  };

  return (
    <Button
      aria-label="Remove link"
      onClick={onClick}
      onMouseEnter={(e) => {
        onHoverStart(e, {
          text: "Remove link",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          className: "px-2 py-1.5",
        });
      }}
      onMouseLeave={() => {
        onHoverEnd();
      }}
      isActive={isLinkActive(editor)}
    >
      <BiUnlink size={18} />
    </Button>
  );
}
