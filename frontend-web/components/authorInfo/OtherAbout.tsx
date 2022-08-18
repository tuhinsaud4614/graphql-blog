import { useLockBody } from "@hooks";
import { ReactorModal, SlateViewer } from "components";
import { Fragment, useState } from "react";
import { Descendant } from "slate";

const className = {
  root: "flex flex-col",
  content: "my-10 text-neutral dark:text-neutral-dark",
  bottom: "flex items-center border-t pt-4",
  btn: "text-accent dark:text-accent-dark hover:text-neutral dark:hover:text-neutral-dark active:scale-95",
};

// const initialValue = [
//   { children: [{ text: "shshjhjsdhs", bold: true }], type: "heading-one" },
//   { type: "heading-two", children: [{ bold: true, text: "kjdshdhjshjds" }] },
//   { children: [{ bold: true, text: "mndsmndsbmnbmds" }] },
//   { children: [{ text: "dsmnbmdsbmdsbnm", bold: false }], type: "code" },
//   { type: "block-quote", children: [{ bold: false, text: "dshjsdhjjsdhjd" }] },
//   { type: "paragraph", children: [{ bold: false, text: "" }] },
//   { type: "paragraph", children: [{ bold: false, text: "" }] },
//   {
//     type: "link",
//     url: "https://miro.medium.com/max/1400/0*iTuEmxLD1IOJ5Xf1.png",
//     children: [{ text: "tuhin hhhhhh" }],
//   },
//   { type: "paragraph", children: [{ bold: false, text: "" }] },
//   { type: "paragraph", children: [{ bold: false, text: "" }] },
//   {
//     type: "image",
//     url: "/demo.png",
//     children: [{ text: "" }],
//   },
//   { type: "paragraph", children: [{ bold: false, text: "" }] },
//   { type: "paragraph", children: [{ bold: false, text: "" }] },
//   {
//     type: "video",
//     url: "https://player.vimeo.com/video/26689853",
//     children: [{ text: "" }],
//   },
//   { type: "paragraph", children: [{ bold: false, text: "" }] },
//   {
//     type: "numbered-list",
//     children: [
//       { type: "list-item", children: [{ bold: false, text: "dnsdhjdhjs" }] },
//     ],
//   },
// ];

interface Props {
  about?: Descendant[] | null;
}

export default function OtherAboutTab({ about }: Props) {
  return (
    <div className={className.root}>
      <section className={className.content}>
        {about ? (
          <SlateViewer value={about} />
        ) : (
          "The author doesn't like to express himself/herself"
        )}
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
        <span className="mx-3 text-neutral dark:text-neutral-dark">·</span>
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
        {/* {Array.from({ length: 15 }).map((_, index) => (
          <ReactorModalItem key={index} />
        ))} */}
      </ReactorModal>
    </Fragment>
  );
}
