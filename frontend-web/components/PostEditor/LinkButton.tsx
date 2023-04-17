import * as React from "react";

import { BiLink } from "react-icons/bi";
import { ReactEditor, useSlateStatic } from "slate-react";

import { Menu, SlateButton } from "@/components";
import { useTooltip } from "@/hooks";
import { insertLink, isLinkActive } from "@/utils";

import { Url } from "./EmbedButton/Url";

const className = {
  content: "w-56 p-2",
};

export default function LinkButton() {
  const [anchorEle, setAnchorEle] = React.useState<null | HTMLButtonElement>(
    null,
  );
  const editor = useSlateStatic() as ReactEditor;
  const { onHoverEnd, onHoverStart } = useTooltip();

  const onAdd = (url: string) => {
    insertLink(editor, url);
    setAnchorEle(null);
  };

  return (
    <React.Fragment>
      <SlateButton
        aria-label="Insert link"
        onClick={(e) => setAnchorEle(e.currentTarget)}
        onMouseEnter={(e) => {
          onHoverStart(e, {
            text: "Insert link",
            anchorOrigin: { vertical: "top", horizontal: "center" },
            className: "px-2 py-1.5",
          });
        }}
        onMouseLeave={() => {
          onHoverEnd();
        }}
        isActive={isLinkActive(editor)}
      >
        <BiLink size={18} />
      </SlateButton>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        hideArrow
      >
        <div className={className.content}>
          <h3 className="mb-3 text-center text-base font-medium text-neutral dark:text-neutral-dark">
            INSERT LINK
          </h3>
          <Url onAdd={onAdd} title="Url" />
        </div>
      </Menu>
    </React.Fragment>
  );
}
