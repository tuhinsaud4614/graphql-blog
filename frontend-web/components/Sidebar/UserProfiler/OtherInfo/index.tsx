import { useLockBody } from "@hooks";
import classNames from "classnames";
import { Button, ReactorModal } from "components";
import { useUserMentionTooltipStatsQuery } from "graphql/generated/schema";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Descendant } from "slate";
import { followConvert, serializeSlateValue } from "utils";
import { IUser } from "utils/interfaces";
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
  user: IUser;
}

export default function OtherInfo({ user }: Props) {
  const { data } = useUserMentionTooltipStatsQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id: user.id },
  });

  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  useLockBody(open);

  const { about } = user;
  const aboutText = useMemo(
    () =>
      about ? serializeSlateValue(JSON.parse(about) as Descendant[]) : null,
    [about]
  );

  useEffect(() => {
    setCount(data?.userResult.followerCount ?? 0);
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
        <FollowButton
          isFollowed={data.userResult.hasFollow}
          toId={user.id}
          onFollow={(isFollowed) => {
            if (isFollowed) {
              setCount((prev) => prev + 1);
            } else {
              setCount((prev) => (!!prev ? prev - 1 : 0));
            }
          }}
        />
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
