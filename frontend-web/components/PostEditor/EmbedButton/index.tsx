import { useTooltip } from "@hooks";
import { Menu } from "components";
import { Fragment, useState } from "react";
import { ImEmbed } from "react-icons/im";
import { Transforms } from "slate";
import { ReactEditor, useSlateStatic } from "slate-react";
import Button from "../Button";
import { Url } from "./Url";

const className = {
  content: "w-56 p-2",
};

export default function EmbedButton() {
  const [anchorEle, setAnchorEle] = useState<null | HTMLButtonElement>(null);
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
    <Fragment>
      <Button
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
      </Button>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        hideArrow
      >
        <div className={className.content}>
          <h3 className="text-base text-neutral dark:text-neutral-dark text-center mb-3 font-medium">
            EMBEDS URL
          </h3>
          <Url onAdd={onAdd} />
        </div>
      </Menu>
    </Fragment>
  );
}
