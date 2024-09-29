"use client";

import { useSendUnFollowRequestMutation } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/lib/utils";

import ErrorModal from "../ErrorModal";
import Button from "../ui/Button";

export default function UnFollowButton({
  className,
  onUnFollow,
  toId,
}: Readonly<{
  className: string;
  onUnFollow(): void;
  toId: string;
}>) {
  const [send, { loading, error, reset }] = useSendUnFollowRequestMutation({
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });
  return (
    <>
      <Button
        type="button"
        aria-label="Following"
        className={className}
        onClick={async () => {
          try {
            await send({ variables: { toId } });
            onUnFollow();
          } catch (_) {}
        }}
        mode="outline"
        loading={loading}
        disabled={loading}
      >
        Following
      </Button>
      <ErrorModal
        onClose={reset}
        title="Send un-follow request errors"
        errors={gplErrorHandler(error)}
      />
    </>
  );
}
