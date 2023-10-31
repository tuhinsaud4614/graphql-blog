"use client";

import * as React from "react";

import { useApolloClient } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { z } from "zod";

import AccountForm from "@/app/account/_components/Form";
import ErrorModal from "@/components/ErrorModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ROUTES, VALID_EMAIL_REGEX, VALID_MOBILE_REGEX } from "@/lib/constants";

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
  const [error, setError] = React.useState<string | undefined>(undefined);
  const emailOrPasswordId = React.useId();
  const passwordId = React.useId();

  const client = useApolloClient();

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
    await client.resetStore();

    const response = await signIn("credentials", {
      emailOrMobile: emailMobile,
      password,
      redirect: true,
      callbackUrl: ROUTES.user.home,
    });

    if (response && !response.ok && response.error) {
      setError(response.error);
      reset();
    }
  });

  return (
    <>
      <AccountForm
        changeLink={ROUTES.register}
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
      <Toaster richColors />
      <ErrorModal
        onClose={() => setError(undefined)}
        title="Login Errors"
        errors={error}
      />
    </>
  );
}
