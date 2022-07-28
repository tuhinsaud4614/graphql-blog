import { useTooltip } from "@hooks";
import { Menu } from "components";
import { Fragment, useState } from "react";
import { BiLink } from "react-icons/bi";
import { ReactEditor, useSlateStatic } from "slate-react";
import { insertLink, isLinkActive } from "utils";
import Button from "./Button";
import { Url } from "./EmbedButton/Url";

const className = {
  content: "w-56 p-2",
};

export default function LinkButton() {
  const [anchorEle, setAnchorEle] = useState<null | HTMLButtonElement>(null);
  const editor = useSlateStatic() as ReactEditor;
  const { onHoverEnd, onHoverStart } = useTooltip();

  const onAdd = (url: string) => {
    insertLink(editor, url);
    setAnchorEle(null);
  };

  return (
    <Fragment>
      <Button
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
            INSERT LINK
          </h3>
          <Url onAdd={onAdd} title="Url" />
        </div>
      </Menu>
    </Fragment>
  );
}
