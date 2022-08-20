import { useLockBody } from "@hooks";
import classNames from "classnames";
import { ReactorModal, SlateViewer } from "components";
import { useGetUserFollowQuery } from "graphql/generated/schema";
import { Fragment, useState } from "react";
import { Descendant } from "slate";
import { followConvert } from "utils";
import BottomFollowers from "./BottomFollowers";
import BottomFollowings from "./BottomFollowings";

const className = {
  root: "flex flex-col",
  content: "my-10 text-neutral dark:text-neutral-dark",
  bottom: "flex items-center border-t pt-4",
  btn: "text-accent dark:text-accent-dark hover:text-neutral dark:hover:text-neutral-dark active:scale-95",

  skeltonCommon:
    "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20 rounded-full",
  skeletonText: "w-16 h-6",
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
  userId: string;
}

export default function OtherAboutTab({ userId, about }: Props) {
  const [open, setOpen] = useState<"follower" | "following" | null>(null);
  useLockBody(!!open);

  const { loading, data, error } = useGetUserFollowQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: { id: userId },
  });

  return (
    <Fragment>
      <div className={className.root}>
        <section className={className.content}>
          {about ? (
            <SlateViewer value={about} />
          ) : (
            "The author doesn't like to express himself/herself"
          )}
        </section>
        <div className={className.bottom}>
          {loading || error || !data?.userFollow ? (
            <span
              className={classNames(
                className.skeltonCommon,
                className.skeletonText
              )}
            />
          ) : (
            <button
              type="button"
              aria-label="Followers"
              className={className.btn}
              onClick={() => setOpen("follower")}
            >
              {followConvert(data.userFollow.followerCount, "Follower")}
            </button>
          )}
          <span className="mx-3 text-neutral dark:text-neutral-dark">·</span>
          {loading || error || !data?.userFollow ? (
            <span
              className={classNames(
                className.skeltonCommon,
                className.skeletonText
              )}
            />
          ) : (
            <button
              type="button"
              aria-label="Following"
              className={className.btn}
              onClick={() => setOpen("following")}
            >
              {followConvert(data.userFollow.followingCount, "Following")}
            </button>
          )}
        </div>
      </div>
      {!!data?.userFollow && (
        <ReactorModal
          title={
            open === "follower"
              ? followConvert(data.userFollow.followerCount, "follower")
              : followConvert(data.userFollow.followingCount, "following")
          }
          open={!!open}
          onHide={() => setOpen(null)}
        >
          {open === "follower" && <BottomFollowers userId={userId} />}
          {open === "following" && <BottomFollowings userId={userId} />}
        </ReactorModal>
      )}
    </Fragment>
  );
}
