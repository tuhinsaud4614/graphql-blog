import { useTooltip } from "@hooks";
import classNames from "classnames";
import { Menu } from "components";
import { Fragment, useState } from "react";
import { BiImage } from "react-icons/bi";
import { ReactEditor, useSlateStatic } from "slate-react";
import Button from "../Button";
import { insertImage } from "../utils";
import { Upload } from "./Upload";
import { Url } from "./Url";

const className = {
  content: "bg-base-100 w-56 p-2 min-h-[15rem] flex flex-col",
  tabs: "flex items-center justify-center mb-3",
  tab: "flex-1 px-3 py-1 text-center relative text-neutral hover:text-info",
  tabActive:
    "text-info after:content-[''] after:absolute after:z-10 after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-info after:w-3/4",
};

export default function ImageButton() {
  const [anchorEle, setAnchorEle] = useState<null | HTMLButtonElement>(null);
  const [currentTab, setCurrentTab] = useState(0);
  const editor = useSlateStatic();
  const { onHoverEnd, onHoverStart } = useTooltip();

  return (
    <Fragment>
      <Button
        aria-label="Insert image"
        onClick={(e) => setAnchorEle(e.currentTarget)}
        onMouseEnter={(e) => {
          onHoverStart(e, {
            text: "Insert image",
            anchorOrigin: { vertical: "top", horizontal: "center" },
            className: "px-2 py-1.5",
          });
        }}
        onMouseLeave={() => {
          onHoverEnd();
        }}
      >
        <BiImage size={18} />
      </Button>
      <Menu
        open={Boolean(anchorEle)}
        anchorEle={anchorEle}
        onClose={() => setAnchorEle(null)}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        hideArrow
      >
        <div className={className.content}>
          <section className={className.tabs}>
            <button
              aria-label="Tab upload"
              type="button"
              className={classNames(
                className.tab,
                currentTab === 0 && className.tabActive
              )}
              onClick={() => setCurrentTab(0)}
            >
              UPLOAD
            </button>
            <button
              aria-label="Tab url"
              type="button"
              className={classNames(
                className.tab,
                currentTab === 1 && className.tabActive
              )}
              onClick={() => setCurrentTab(1)}
            >
              URL
            </button>
          </section>
          {currentTab === 0 && (
            <Upload
              onAdd={(url) => {
                insertImage(editor as ReactEditor, url);
                setAnchorEle(null);
              }}
            />
          )}
          {currentTab === 1 && (
            <Url
              onAdd={(url) => {
                insertImage(editor as ReactEditor, url);
                setAnchorEle(null);
              }}
            />
          )}
        </div>
      </Menu>
    </Fragment>
  );
}
