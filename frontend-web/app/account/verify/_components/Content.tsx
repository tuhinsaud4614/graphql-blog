"use client";

import * as React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import _isEmpty from "lodash/isEmpty";
import { ShieldAlert } from "lucide-react";

import Loader from "@/components/svg/Loader";
import LinkButton from "@/components/ui/LinkButton";
import { useUserVerificationMutation } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { isDev } from "@/lib/isType";
import { gplErrorHandler } from "@/lib/utils";

import ResendButton from "./Resend";

const className = {
  container: "flex flex-col items-center justify-center min-h-[40vh]",
  items: "list-item flex-col m-0 space-y-2",
  item: "text-error text-lg",
  text: "text-warning text-lg font-medium",
};

export default function VerifyAccountContent() {
  const effectRan = React.useRef(false);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [verifyUser, { loading, data, error }] = useUserVerificationMutation({
    errorPolicy: "all",
    fetchPolicy: "network-only",
  });
  const code = searchParams.get("code");
  const userId = searchParams.get("userId");

  React.useEffect(() => {
    if ((effectRan.current || !isDev()) && code && userId) {
      const handler = async () => {
        try {
          const { data } = await verifyUser({
            variables: { code: code, userId: userId },
          });

          if (data?.verifyUser && data.verifyUser === userId) {
            replace(ROUTES.login);
          }
        } catch (error) {}
      };
      void handler();
    }
    return () => {
      effectRan.current = true;
    };
  }, [code, replace, userId, verifyUser]);

  const errors = gplErrorHandler(error);

  if (_isEmpty(searchParams.size)) {
    return (
      <div className={className.container}>
        <Loader className="h-48 w-48" />
      </div>
    );
  }

  if (errors) {
    return (
      <div className={className.container}>
        <ShieldAlert size={50} className="mb-4 text-error" />
        {Array.isArray(errors) ? (
          <ul className={className.items}>
            {errors.map((er) => (
              <li key={er} className={className.item}>
                {er}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p className={className.item}>{errors}!</p>
            <div className="mt-4 flex items-center justify-center space-x-3">
              <LinkButton
                replace
                href={ROUTES.home}
                variant="warning"
                mode="outline"
              >
                Go to home
              </LinkButton>
              {errors !== "User already verified" && userId && (
                <ResendButton userId={userId} />
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  if (!loading && data?.verifyUser) {
    return (
      <div className={className.container}>
        <p className="text-success">{data.verifyUser} verified successfully.</p>
      </div>
    );
  }

  return (
    <div className={className.container}>
      <h3 className={className.text}>Verifying account</h3>
      <Loader className="h-48 w-48" />
    </div>
  );
}
