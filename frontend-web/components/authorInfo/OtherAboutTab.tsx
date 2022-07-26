import { useLockBody } from "@hooks";
import { ReactorModal, ReactorModalItem, SlateViewer } from "components";
import { Fragment, useState } from "react";

const className = {
  root: "flex flex-col",
  content: "my-10",
  bottom: "flex items-center border-t pt-4",
  btn: "text-accent hover:text-neutral active:scale-95",
};

const initialValue = [
  { children: [{ text: "shshjhjsdhs", bold: true }], type: "heading-one" },
  { type: "heading-two", children: [{ bold: true, text: "kjdshdhjshjds" }] },
  { children: [{ bold: true, text: "mndsmndsbmnbmds" }] },
  { children: [{ text: "dsmnbmdsbmdsbnm", bold: false }], type: "code" },
  { type: "block-quote", children: [{ bold: false, text: "dshjsdhjjsdhjd" }] },
  { type: "paragraph", children: [{ bold: false, text: "" }] },
  { type: "paragraph", children: [{ bold: false, text: "" }] },
  {
    type: "image",
    url: "https://miro.medium.com/max/1400/0*iTuEmxLD1IOJ5Xf1.png",
    children: [{ text: "" }],
  },
  { type: "paragraph", children: [{ bold: false, text: "" }] },
  { type: "paragraph", children: [{ bold: false, text: "" }] },
  {
    type: "video",
    url: "https://player.vimeo.com/video/26689853",
    children: [{ text: "" }],
  },
  { type: "paragraph", children: [{ bold: false, text: "" }] },
  {
    type: "numbered-list",
    children: [
      { type: "list-item", children: [{ bold: false, text: "dnsdhjdhjs" }] },
    ],
  },
];

export default function OtherAboutTab() {
  return (
    <div className={className.root}>
      <section className={className.content}>
        <SlateViewer value={initialValue} />
      </section>
      <Bottom />
    </div>
  );
}

function Bottom() {
  const [open, setOpen] = useState<"followers" | "following" | null>(null);
  useLockBody(!!open);
  return (
    <Fragment>
      <div className={className.bottom}>
        <button
          type="button"
          aria-label="Followers"
          className={className.btn}
          onClick={() => setOpen("followers")}
        >
          321 Followers
        </button>
        <span className="mx-3 text-neutral">·</span>
        <button
          type="button"
          aria-label="Following"
          className={className.btn}
          onClick={() => setOpen("following")}
        >
          121 Following
        </button>
      </div>
      <ReactorModal
        title={`321 ${open}`}
        open={!!open}
        onHide={() => setOpen(null)}
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <ReactorModalItem key={index} />
        ))}
      </ReactorModal>
    </Fragment>
  );
}
