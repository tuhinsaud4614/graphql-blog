"use client";

import * as React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useApolloClient } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AccountForm from "@/app/account/(auth)/_components/Form";
import ErrorModal from "@/components/ErrorModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
// import { doCredentialLogin } from "@/lib/actions";
import { ROUTES } from "@/lib/constants";
import { isDev } from "@/lib/isType";

import { LoginSuccessResponse } from "@/app/api/auth/login/route";
import { callPostApi } from "@/lib/api";
import GoogleLoginButton from "./GoogleAuthButton";

const schema = z.object({
  email: z.string().email("Must be a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export default function Login() {
  const client = useApolloClient();
  const [error, setError] = React.useState<string | undefined>(undefined);
  const emailOrPasswordId = React.useId();
  const passwordId = React.useId();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    register,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const callbackUrl = searchParams?.get("callbackUrl");
      // await client.resetStore();

      const response = await callPostApi<LoginSuccessResponse>(
        "/api/auth/login",
        { email, password },
        undefined,
      );

      console.log(response);

      // if (response) {
      //   console.log("error1", error);
      //   setError(response.error);
      // } else {
      //   reset();
      //   // // For solving not replacing login url with redirect url
      //   // callbackUrl && refresh();
      //   replace(callbackUrl ?? ROUTES.user.home);
      // }
    } catch (error) {
      setError((error as Error).message);
      isDev() && console.error("Login@Errors: ", error);
    }
  });

  return (
    <>
      <AccountForm
        changeLink={ROUTES.account.register}
        changeLinkText="Create one"
        changeText="No account?"
        title="Sign in with email"
        onSubmit={onSubmit}
      >
        <Input
          classes={{
            root: "mb-4",
            label: "selection:text-base-100 selection:bg-neutral",
          }}
          id={emailOrPasswordId}
          title="Your email"
          aria-label="email"
          aria-invalid={!!errors.email}
          type="text"
          valid={!errors.email}
          errorText={errors.email?.message}
          {...register("email")}
          required
        />

        <Input
          classes={{
            root: "mb-4",
            label: "selection:text-base-100 selection:bg-neutral",
          }}
          id={passwordId}
          title="Your password"
          aria-label="password"
          aria-invalid={!!errors.password}
          type="password"
          valid={!errors.password}
          errorText={errors.password?.message}
          {...register("password")}
          required
        />

        <div className="flex justify-center py-3">
          <Button
            className="w-full !py-2 px-5 "
            type="submit"
            aria-label="Login"
            loading={isSubmitting}
            disabled={!(isDirty && isValid) || isSubmitting}
          >
            Login
          </Button>
        </div>
        <div className="mt-2">
          <div className="relative">
            <div className="my-6 h-px w-full shrink-0 bg-border" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <GoogleLoginButton />
          </div>
        </div>
      </AccountForm>
      <ErrorModal
        onClose={() => setError(undefined)}
        title="Login Errors"
        errors={error}
      />
    </>
  );
}
