"use client";

import * as React from "react";

import { Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";

import { Menu, SlateButton } from "@/components";

import useTooltip from "@/hooks/useTooltip";
import { CodeIcon } from "lucide-react";
import { Url } from "./Url";

const className = {
  content: "w-56 p-2",
};

export default function EmbedButton() {
  const [anchorEle, setAnchorEle] = React.useState<null | HTMLButtonElement>(
    null,
  );
  const editor = useSlateStatic() as ReactEditor;
  const { onHoverEnd, onHoverStart } = useTooltip();

  const onAdd = (url: string) => {
    try {
      Transforms.insertNodes(editor, [
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          type: "video",
          url,
          children: [
            {
              text: "",
            },
          ],
        },
      ]);
    } catch {
    } finally {
      setAnchorEle(null);
    }
  };

  return (
    <React.Fragment>
      <SlateButton
        aria-label="Insert embeds"
        onClick={(e) => setAnchorEle(e.currentTarget)}
        onMouseEnter={(e) => {
          onHoverStart(e, {
            text: "Insert embeds",
            anchorOrigin: { vertical: "top", horizontal: "center" },
            className: "px-2 py-1.5",
          });
        }}
        onMouseLeave={() => {
          onHoverEnd();
        }}
      >
        <CodeIcon size={18} />
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
            EMBEDS URL
          </h3>
          <Url onAdd={onAdd} />
        </div>
      </Menu>
    </React.Fragment>
  );
}
