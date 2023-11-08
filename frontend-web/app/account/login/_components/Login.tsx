"use client";

import * as React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useApolloClient } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import AccountForm from "@/app/account/_components/Form";
import ErrorModal from "@/components/ErrorModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ROUTES, VALID_EMAIL_REGEX, VALID_MOBILE_REGEX } from "@/lib/constants";
import { isDev } from "@/lib/isType";

const schema = z.object({
  emailMobile: z
    .string()
    .min(1, "Email address or mobile number is required.")
    .refine((value) => {
      return (
        !!value &&
        (VALID_MOBILE_REGEX.test(value) || VALID_EMAIL_REGEX.test(value))
      );
    }, "Must be valid a mobile number or email address."),
  password: z.string().min(1, "Password is required."),
});

export default function Login() {
  const client = useApolloClient();
  const [error, setError] = React.useState<string | undefined>(undefined);
  const emailOrPasswordId = React.useId();
  const passwordId = React.useId();
  const { replace, refresh } = useRouter();
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
      emailMobile: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit(async ({ emailMobile, password }) => {
    try {
      const callbackUrl = searchParams.get("callbackUrl") ?? undefined;

      await client.resetStore();
      const response = await signIn("credentials", {
        emailOrMobile: emailMobile,
        password,
        redirect: false,
      });

      if (response?.ok) {
        reset();
        // For solving not replacing login url with redirect url
        callbackUrl && refresh();
        replace(callbackUrl || ROUTES.user.home);
      } else if (response?.error) {
        setError(response.error);
      }
    } catch (error) {
      isDev() && console.error("Login@Errors: ", error);
    }
  });

  return (
    <>
      <AccountForm
        changeLink={ROUTES.account.register}
        changeLinkText="Create one"
        changeText="No account?"
        title="Sign in with email or mobile"
        onSubmit={onSubmit}
      >
        <Input
          classes={{
            root: "mb-4",
            label: "selection:text-base-100 selection:bg-neutral",
          }}
          id={emailOrPasswordId}
          title="Your email or mobile"
          aria-label="email"
          aria-invalid={!!errors.emailMobile}
          type="text"
          valid={!errors.emailMobile}
          errorText={errors.emailMobile?.message}
          {...register("emailMobile")}
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
            className="w-[14.125rem] !py-2 px-5 "
            type="submit"
            aria-label="Login"
            loading={isSubmitting}
            disabled={!(isDirty && isValid) || isSubmitting}
          >
            Login
          </Button>
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
