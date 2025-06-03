"use client";

import * as React from "react";

import { ReactEditor, useSlateStatic } from "slate-react";

import { Menu, SlateButton } from "@/components";

import useTooltip from "@/hooks/useTooltip";
import { insertLink, isLinkActive } from "@/lib/utils";
import { LinkIcon } from "lucide-react";
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
        <LinkIcon size={18} />
      </SlateButton>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        hideArrow
      >
        <div className={className.content}>
          <h3 className="dark:text-neutral-dark mb-3 text-center text-base font-medium text-neutral">
            INSERT LINK
          </h3>
          <Url onAdd={onAdd} title="Url" />
        </div>
      </Menu>
    </React.Fragment>
  );
}
