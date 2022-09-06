import { selectAuthorFollowerCount, setAuthorFollowerCount } from "@features";
import { useLockBody } from "@hooks";
import classNames from "classnames";
import { Button, ReactorModal } from "components";
import {
  FGetUserFragment,
  useUserMentionTooltipStatsQuery,
} from "graphql/generated/schema";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Descendant } from "slate";
import { useAppDispatch, useAppSelector } from "store";
import { followConvert, serializeSlateValue } from "utils";
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
  user: FGetUserFragment;
}

export default function OtherInfo({ user }: Props) {
  const { data } = useUserMentionTooltipStatsQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id: user.id },
    fetchPolicy: "network-only",
  });
  const count = useAppSelector(selectAuthorFollowerCount);
  const rdxDispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  useLockBody(open);

  const { about } = user;
  const aboutText = useMemo(
    () =>
      about ? serializeSlateValue(JSON.parse(about) as Descendant[]) : null,
    [about]
  );

  useEffect(() => {
    if (data?.userResult.followerCount) {
      rdxDispatch(setAuthorFollowerCount(data.userResult.followerCount));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.userResult.followerCount]);

  return (
    <Fragment>
      {data?.userResult ? (
        <Button
          aria-label="Followers"
          type="button"
          onClick={() => {
            !!count && setOpen(true);
          }}
          variant="neutral"
          mode="text"
          className="px-0"
          disabled={!count}
        >
          {followConvert(count, "follower")}
        </Button>
      ) : (
        <span
          className={classNames(
            className.skeltonCommon,
            className.skeletonText
          )}
        />
      )}
      {aboutText && <p className={className.about}>{aboutText}</p>}
      {data?.userResult ? (
        <FollowButton isFollowed={data.userResult.hasFollow} toId={user.id} />
      ) : (
        <span
          className={classNames(className.skeltonCommon, className.skeletonBtn)}
        />
      )}
      {!!count && (
        <ReactorModal
          title={followConvert(count, "follower")}
          open={open}
          onHide={() => setOpen(false)}
        >
          <AllFollowers authorId={user.id} />
        </ReactorModal>
      )}
    </Fragment>
  );
}
