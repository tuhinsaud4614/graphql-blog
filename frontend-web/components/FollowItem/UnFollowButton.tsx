import * as React from "react";

import { Button, ErrorModal } from "@/components";
import { useSendUnFollowRequestMutation } from "@/graphql/generated/schema";
import { gplErrorHandler } from "@/utils";

export default function UnFollowButton({
  className,
  onUnFollow,
  toId,
}: {
  className: string;
  onUnFollow(): void;
  toId: string;
}) {
  const [send, { loading, error, reset }] = useSendUnFollowRequestMutation({
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });
  return (
    <React.Fragment>
      <Button
        type="button"
        aria-label="Following"
        className={className}
        onClick={async () => {
          try {
            await send({ variables: { toId } });
            onUnFollow();
          } catch (error) {}
        }}
        mode="outline"
        loading={loading}
        disabled={loading}
      >
        Following
      </Button>
      <ErrorModal
        onClose={() => reset()}
        title="Send un-follow request errors"
        errors={gplErrorHandler(error)}
      />
    </React.Fragment>
  );
}
