"use client";

import * as React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import _isEmpty from "lodash/isEmpty";
import { ShieldAlert } from "lucide-react";
import { toast } from "sonner";

import Loader from "@/components/svg/Loader";
import LinkButton from "@/components/ui/LinkButton";
import { useVerifyResetPasswordMutation } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { isDev } from "@/lib/isType";
import { gplErrorHandler } from "@/lib/utils";

export default function Content() {
  const effectRan = React.useRef(false);
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const [verifyResetPassword, { error, loading, data }] =
    useVerifyResetPasswordMutation({
      fetchPolicy: "network-only",
    });

  const code = searchParams.get("code");

  React.useEffect(() => {
    let timeout: number = 0;
    if ((effectRan.current || !isDev()) && code) {
      const handler = async () => {
        try {
          const { data } = await verifyResetPassword({
            variables: { code: code },
          });
          if (data?.verifyResetPassword) {
            toast.success(data.verifyResetPassword, {
              position: "top-center",
              duration: 2000,
            });
            timeout = window.setTimeout(() => {
              replace(ROUTES.user.settings);
            }, 2000);
          }
        } catch (error) {
          isDev() && console.error("VerifyResetPassword@Error: ", error);
        }
      };
      void handler();
    }

    return () => {
      effectRan.current = true;
      clearTimeout(timeout);
    };
  }, [code, replace, verifyResetPassword]);

  const errors = gplErrorHandler(error);

  if (_isEmpty(searchParams.size)) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center">
        <Loader className="h-48 w-48" />
      </div>
    );
  }

  if (errors) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center">
        <ShieldAlert size={50} className="mb-4 text-error" />
        <ul className="m-0 list-item flex-col space-y-2">
          {Array.isArray(errors) ? (
            errors.map((er) => (
              <li key={er} className="text-lg text-error">
                {er}
              </li>
            ))
          ) : (
            <li className="text-lg text-error">{errors}</li>
          )}
        </ul>

        <div className="mt-4 flex items-center justify-center space-x-3">
          <LinkButton
            href={ROUTES.user.settings}
            variant="warning"
            mode="outline"
            replace
          >
            Go to settings
          </LinkButton>
        </div>
      </div>
    );
  }

  if (!loading && data?.verifyResetPassword) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center">
        <p className="text-success">{data.verifyResetPassword}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center">
      <h3 className="text-lg font-medium text-warning">
        Verifying Reset Password
      </h3>
      <Loader className="h-48 w-48" />
    </div>
  );
}
