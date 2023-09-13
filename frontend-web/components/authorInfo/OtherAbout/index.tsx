import * as React from "react";

import { Descendant } from "slate";

import { Button, ReactorModal, SlateViewer } from "@/components";
import { selectAuthorFollowerCount } from "@/features";
import { useGetUserFollowingsQuery } from "@/graphql/generated/schema";
import { useLockBody } from "@/hooks";
import { useAppSelector } from "@/store";
import { cn, countConvert } from "@/utils";

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
  const [open, setOpen] = React.useState<"follower" | "following" | null>(null);
  useLockBody(!!open);

  const { loading, data, error } = useGetUserFollowingsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: { id: userId },
  });

  const count = useAppSelector(selectAuthorFollowerCount);

  return (
    <React.Fragment>
      <div className={className.root}>
        <section className={className.content}>
          {about ? (
            <SlateViewer value={about} />
          ) : (
            "The author doesn't like to express himself/herself"
          )}
        </section>
        <div className={className.bottom}>
          {loading || error || !data ? (
            <span
              className={cn(className.skeltonCommon, className.skeletonText)}
            />
          ) : (
            <Button
              type="button"
              aria-label="Followers"
              className="px-0"
              disabled={!count}
              onClick={() => {
                count && setOpen("follower");
              }}
              mode="text"
            >
              {countConvert(count, "Follower")}
            </Button>
          )}
          <span className="mx-3 text-neutral dark:text-neutral-dark">·</span>
          {loading || error || !data ? (
            <span
              className={cn(className.skeltonCommon, className.skeletonText)}
            />
          ) : (
            <Button
              type="button"
              aria-label="Following"
              className="px-0"
              disabled={!data.userFollowings}
              onClick={() => {
                !!data.userFollowings && setOpen("following");
              }}
              mode="text"
            >
              {countConvert(data.userFollowings, "Following")}
            </Button>
          )}
        </div>
      </div>
      {(!!data?.userFollowings || !!count) && (
        <ReactorModal
          title={
            open === "follower"
              ? countConvert(count, "follower")
              : countConvert(data?.userFollowings ?? 0, "following")
          }
          open={!!open}
          onHide={() => setOpen(null)}
        >
          {open === "follower" && <BottomFollowers userId={userId} />}
          {open === "following" && <BottomFollowings userId={userId} />}
        </ReactorModal>
      )}
    </React.Fragment>
  );
}
