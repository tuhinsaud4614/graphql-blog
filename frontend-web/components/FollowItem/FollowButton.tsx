import { Button, ErrorModal } from "components";
import { useSendFollowRequestMutation } from "graphql/generated/schema";
import { Fragment } from "react";
import { gplErrorHandler } from "utils";

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
    <Fragment>
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
        onClose={() => reset()}
        title="Send follow request errors"
        errors={gplErrorHandler(error)}
      />
    </Fragment>
  );
}
