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
import { countConvert, serializeSlateValue } from "utils";
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
  authenticated?: boolean;
}

export default function OtherInfo({ user, authenticated }: Props) {
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

  const followerCount = data?.userResult.followerCount;

  useEffect(() => {
    if (followerCount) {
      rdxDispatch(setAuthorFollowerCount(followerCount));
    }
  }, [followerCount, rdxDispatch]);

  const onCountClick = () => {
    setOpen(true);
  };

  return (
    <Fragment>
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
        <span
          className={classNames(
            className.skeltonCommon,
            className.skeletonText
          )}
        />
      )}
      {aboutText && <p className={className.about}>{aboutText}</p>}
      {authenticated && (
        <Fragment>
          {data?.userResult ? (
            <FollowButton
              isFollowed={data.userResult.hasFollow}
              toId={user.id}
            />
          ) : (
            <span
              className={classNames(
                className.skeltonCommon,
                className.skeletonBtn
              )}
            />
          )}
        </Fragment>
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
    </Fragment>
  );
}
