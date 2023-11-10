"use client";

import { useSendFollowRequestMutation } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/lib/utils";

import ErrorModal from "../ErrorModal";
import Button from "../ui/Button";

export default function FollowButton({
  className,
  onFollow,
  toId,
}: {
  className: string;
  onFollow(): void;
  toId: string;
}) {
  const [send, { loading, error, reset }] = useSendFollowRequestMutation({
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });
  return (
    <>
      <Button
        type="button"
        aria-label="Follow"
        className={className}
        onClick={async () => {
          try {
            await send({ variables: { toId } });
            onFollow();
          } catch (error) {}
        }}
        loading={loading}
        disabled={loading}
      >
        Follow
      </Button>
      <ErrorModal
        onClose={() => void reset()}
        title="Send follow request errors"
        errors={gplErrorHandler(error)}
      />
    </>
  );
}
