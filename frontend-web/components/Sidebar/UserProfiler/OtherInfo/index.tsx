"use client";

import * as React from "react";

import { Descendant } from "slate";

import { Button, ReactorModal } from "@/components";
import {
  FUserFragment,
  useUserMentionTooltipStatsQuery,
} from "@/graphql/generated/schema";

import useLockedBody from "@/hooks/useLockBody";
import { cn, countConvert, serializeOnlyTextSlateValue } from "@/lib/utils";
import AllFollowers from "../AllFollowers";
import FollowButton from "./FollowButton";

const className = {
  about:
    "mt-3 text-sm text-neutral/50 dark:text-neutral-dark/50 line-clamp-1 text-ellipsis",
  skeltonCommon:
    "bg-neutral/20 animate-pulse dark:bg-neutral-dark/20 rounded-full",
  skeletonText: "w-16 h-6",
  skeletonBtn: "w-24 h-8 mt-3",
};

interface Props {
  user: FUserFragment;
  authenticated?: boolean;
}

export default function OtherInfo({ user, authenticated }: Readonly<Props>) {
  const { data } = useUserMentionTooltipStatsQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id: user.id },
    fetchPolicy: "network-only",
  });
  // const count = useAppSelector(selectAuthorFollowerCount);
  const count = 10;
  // const rdxDispatch = useAppDispatch();

  const [open, setOpen] = React.useState(false);
  useLockedBody(open);

  const { about } = user;
  const aboutText = React.useMemo(
    () =>
      about ? serializeOnlyTextSlateValue(JSON.parse(about) as Descendant[]) : null,
    [about],
  );

  const followerCount = data?.userResult.followerCount;

  React.useEffect(() => {
    if (followerCount) {
      // rdxDispatch(setAuthorFollowerCount(followerCount));
    }
  // }, [followerCount, rdxDispatch]);
  }, [followerCount]);

  const onCountClick = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      {data?.userResult ? (
        <Button
          aria-label="Followers"
          type="button"
          onClick={authenticated && !!count ? onCountClick : undefined}
          variant="neutral"
          mode="text"
          className="px-0"
          disabled={!authenticated || !count}
        >
          {countConvert(count, "follower")}
        </Button>
      ) : (
        <span className={cn(className.skeltonCommon, className.skeletonText)} />
      )}
      {aboutText && <p className={className.about}>{aboutText}</p>}
      {authenticated && (
        <React.Fragment>
          {data?.userResult ? (
            <FollowButton
              isFollowed={data.userResult.hasFollow}
              toId={user.id}
            />
          ) : (
            <span
              className={cn(className.skeltonCommon, className.skeletonBtn)}
            />
          )}
        </React.Fragment>
      )}
      {authenticated && !!count && (
        <ReactorModal
          title={countConvert(count, "follower")}
          open={open}
          onHide={() => setOpen(false)}
        >
          <AllFollowers authorId={user.id} />
        </ReactorModal>
      )}
    </React.Fragment>
  );
}
