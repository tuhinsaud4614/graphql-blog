"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { Toaster, toast } from "sonner";

import Button from "@/components/ui/Button";
import { useResendActivationLinkMutation } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";

export default function ResendButton({ userId }: { userId: string }) {
  const { replace } = useRouter();
  const [resend, { error, loading, data }] = useResendActivationLinkMutation({
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });

  React.useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  React.useEffect(() => {
    if (data?.resendActivation) {
      toast.success(data?.resendActivation, {
        position: "top-center",
      });
      replace(ROUTES.login);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <React.Fragment>
      <Button
        type="button"
        aria-label="Resend verification link"
        variant="primary"
        onClick={async () => {
          await resend({ variables: { userId } });
        }}
        loading={loading}
        disabled={loading}
      >
        Resend verification link
      </Button>
      <Toaster richColors />
    </React.Fragment>
  );
}
