"use client";

import * as React from "react";

import { Descendant } from "slate";

import { Button, ReactorModal, SlateViewer } from "@/components";
import { useGetUserFollowingsQuery } from "@/graphql/generated/schema";

import useLockBody from "@/hooks/useLockBody";
import { cn, countConvert } from "@/lib/utils";
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

interface Props {
  about?: Descendant[] | null;
  userId: string;
}

export default function OtherAboutTab({ userId, about }: Readonly<Props>) {
  const [open, setOpen] = React.useState<"follower" | "following" | null>(null);
  useLockBody(!!open);

  const { loading, data, error } = useGetUserFollowingsQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    variables: { id: userId },
  });

  // const count = useAppSelector(selectAuthorFollowerCount);
  const count = 10;

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
          <span className="dark:text-neutral-dark mx-3 text-neutral">·</span>
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
