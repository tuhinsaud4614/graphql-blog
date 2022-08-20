import { useLockBody } from "@hooks";
import classNames from "classnames";
import { Button, ReactorModal } from "components";
import { useUserMentionTooltipStatsQuery } from "graphql/generated/schema";
import { Fragment, useMemo, useState } from "react";
import { Descendant } from "slate";
import { followConvert, serializeSlateValue } from "utils";
import { IUser } from "utils/interfaces";
import AllFollowers from "./AllFollowers";

const className = {
  countBtn:
    "border-none outline-none text-neutral/60 dark:text-neutral-dark/60 hover:text-neutral-focus dark:hover:text-neutral-dark-focus active:scale-95 min-w-min mt-1",
  about:
    "mt-3 text-sm text-neutral/50 dark:text-neutral-dark/50 line-clamp-1 text-ellipsis",
  followBtn:
    "outline-none px-3.5 py-1.5 rounded-full text-sm text-center inline-block active:scale-95",
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
  const [open, setOpen] = useState(false);
  useLockBody(open);

  const { about } = user;
  const aboutText = useMemo(
    () =>
      about ? serializeSlateValue(JSON.parse(about) as Descendant[]) : null,
    [about]
  );
  return (
    <Fragment>
      {data?.userResult.followerCount ? (
        <button
          aria-label="Followers"
          type="button"
          onClick={() => setOpen(true)}
          className={className.countBtn}
        >
          {followConvert(data.userResult.followerCount, "follower")}
        </button>
      ) : (
        <span
          className={classNames(
            className.skeltonCommon,
            className.skeletonText
          )}
        />
      )}
      {aboutText && <p className={className.about}>{aboutText}</p>}
      {data?.userResult.hasFollow ? (
        <Button
          aria-label={data.userResult.hasFollow ? "Following" : "Follow"}
          type="button"
          className="mt-3 text-sm"
          mode="outline"
        >
          {data.userResult.hasFollow ? "Following" : "Follow"}
        </Button>
      ) : (
        <span
          className={classNames(className.skeltonCommon, className.skeletonBtn)}
        />
      )}
      {!!data?.userResult.followerCount && (
        <ReactorModal
          title={followConvert(data.userResult.followerCount, "follower")}
          open={open}
          onHide={() => setOpen(false)}
        >
          <AllFollowers authorId={user.id} />
        </ReactorModal>
      )}
    </Fragment>
  );
}
