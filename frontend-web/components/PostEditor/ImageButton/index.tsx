import { useTooltip } from "@hooks";
import dynamic from "next/dynamic";
import { Fragment, useState } from "react";
import { BiImage } from "react-icons/bi";
import { useSlateStatic } from "slate-react";
import Button from "../Button";
import { Upload } from "./Upload";

const Menu = dynamic(() => import("../../Menu"), { ssr: false });

const className = {
  content: "bg-base-100 w-56 p-2",
  imgUpload: "flex flex-col items-center justify-between",
  chooseBtn:
    "outline-none border border-dashed rounded-md w-full h-full bg-gray-50 text-gray-500",
  imgContainer: "relative w-full pb-[56.25%]",
  uploadBtn: "",
};

export default function ImageButton() {
  const [anchorEle, setAnchorEle] = useState<null | HTMLButtonElement>(null);
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
          <Upload
            onAdd={(image) => {
              console.log(image);
              setAnchorEle(null);
            }}
          />
        </div>
      </Menu>
    </Fragment>
  );
}
