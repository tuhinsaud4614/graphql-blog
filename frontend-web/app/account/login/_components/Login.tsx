"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { useApolloClient } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { z } from "zod";

import ErrorModal from "@/components/ErrorModal";
import { AuthActionTypes } from "@/components/providers/context/authContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { UserRole, useLoginMutation } from "@/graphql/generated/schema";
import { useAuthDispatch } from "@/hooks/useAuth";
import { ROUTES, VALID_EMAIL_REGEX, VALID_MOBILE_REGEX } from "@/lib/constants";
import { getAuthUser, gplErrorHandler } from "@/lib/utils";

import AccountForm from "../../_components/Form";

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
  const emailOrPasswordId = React.useId();
  const passwordId = React.useId();

  const client = useApolloClient();
  const { replace } = useRouter();
  const authDispatch = useAuthDispatch();

  const [login, { loading, error, reset: mutationReset }] = useLoginMutation({
    errorPolicy: "all",
  });

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
      await client.resetStore();
      const { data } = await login({
        variables: { password, emailOrMobile: emailMobile },
      });
      if (data && data.login) {
        const accessToken = data.login;
        const user = getAuthUser(accessToken);
        authDispatch({
          type: AuthActionTypes.setUser,
          payload: { user, token: accessToken },
        });

        replace(
          user?.role === UserRole.Admin
            ? ROUTES.admin.dashboard
            : ROUTES.myHome,
        );
      }
    } catch (error) {
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
            loading={isSubmitting || loading}
            disabled={!(isDirty && isValid) || isSubmitting}
          >
            Login
          </Button>
        </div>
      </AccountForm>
      <Toaster richColors />
      <ErrorModal
        onClose={mutationReset}
        title="Login Errors"
        errors={gplErrorHandler(error)}
      />
    </>
  );
}
