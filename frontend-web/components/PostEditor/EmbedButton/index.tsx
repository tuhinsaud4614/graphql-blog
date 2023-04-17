import * as React from "react";

import { ImEmbed } from "react-icons/im";
import { Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";

import { Menu, SlateButton } from "@/components";
import { useTooltip } from "@/hooks";

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
          // @ts-ignore
          type: "video",
          url,
          children: [
            {
              text: "",
            },
          ],
        },
      ]);
    } catch (error) {
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
        <ImEmbed size={18} />
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
            EMBEDS URL
          </h3>
          <Url onAdd={onAdd} />
        </div>
      </Menu>
    </React.Fragment>
  );
}
