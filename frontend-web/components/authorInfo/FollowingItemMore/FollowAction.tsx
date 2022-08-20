import { Button } from "components";
import { useState } from "react";

interface Props {
  isFollowed: boolean;
}

export default function FollowAction({ isFollowed }: Props) {
  const [follow, setFollow] = useState(isFollowed);
  return (
    <Button
      type="button"
      aria-label={follow ? "Following" : "Follow"}
      mode={follow ? "outline" : "fill"}
      className="text-sm !px-2 !py-0.5"
    >
      {follow ? "Following" : "Follow"}
    </Button>
  );
}
