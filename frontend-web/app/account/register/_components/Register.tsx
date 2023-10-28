"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { z } from "zod";

import ErrorModal from "@/components/ErrorModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRegisterMutation } from "@/graphql/generated/schema";
import { ROUTES, VALID_MOBILE_REGEX } from "@/lib/constants";
import { gplErrorHandler } from "@/lib/utils";

import AccountForm from "../../_components/Form";
import SuccessMsg from "./Success";

const schema = z
  .object({
    name: z.string().optional(),
    email: z
      .string()
      .min(1, "Email address is required.")
      .email("Must be a valid email address."),
    mobile: z
      .string()
      .min(1, "Mobile is required!")
      .refine((value) => !!value && VALID_MOBILE_REGEX.test(value), {
        message: "Mobile is invalid",
      }),
    password: z.string().min(1, "Password is required."),
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const nameId = React.useId();
  const emailId = React.useId();
  const mobileId = React.useId();
  const passwordId = React.useId();
  const confirmPasswordId = React.useId();

  const { replace } = useRouter();
  const [registerAuthor, { loading, data, error, reset: mutationReset }] =
    useRegisterMutation({ errorPolicy: "all", fetchPolicy: "network-only" });

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    register,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await registerAuthor({ variables: data });
    reset();
  });

  React.useEffect(() => {
    if (!loading && !error && data) {
      toast.success(<SuccessMsg />, {
        position: "top-center",
        duration: 2000,
        dismissible: true,
      });
      const timer = window.setTimeout(() => {
        replace(ROUTES.login);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading, error]);
  return (
    <>
      <AccountForm
        changeLink={ROUTES.login}
        changeLinkText="Sign in"
        changeText="Already have an account?"
        title="Sign up with email or mobile"
        onSubmit={onSubmit}
      >
        <Input
          classes={{ root: "mb-4" }}
          id={nameId}
          title="Your name"
          aria-label="name"
          aria-invalid={!!errors.name}
          type="text"
          valid={!errors.name}
          errorText={errors.name?.message}
          {...register("name")}
        />
        <Input
          classes={{ root: "mb-4" }}
          id={emailId}
          title="Your email"
          aria-label="email"
          aria-invalid={!!errors.email}
          type="email"
          valid={!errors.email}
          errorText={errors.email?.message}
          {...register("email")}
          required
        />
        <Input
          classes={{ root: "mb-4" }}
          id={mobileId}
          title="Your mobile"
          aria-label="mobile"
          aria-invalid={!!errors.mobile}
          type="text"
          valid={!errors.mobile}
          errorText={errors.mobile?.message}
          {...register("mobile")}
          required
        />
        <Input
          classes={{ root: "mb-4" }}
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
        <Input
          classes={{ root: "mb-4" }}
          id={confirmPasswordId}
          title="Your confirm password"
          aria-label="confirmPassword"
          aria-invalid={!!errors.confirmPassword}
          type="password"
          valid={!errors.confirmPassword}
          errorText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
          required
        />
        <div className="flex justify-center py-3">
          <Button
            className="w-[14.125rem] !py-2 px-5 "
            type="submit"
            aria-label="Register"
            loading={isSubmitting}
            disabled={!(isDirty && isValid) || isSubmitting}
          >
            Register
          </Button>
        </div>
      </AccountForm>
      <Toaster richColors />
      <ErrorModal
        onClose={mutationReset}
        title="Registration Errors"
        errors={gplErrorHandler(error)}
      />
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const token = getCookie("jwt", { req, res });
//   if (token) {
//     return {
//       redirect: { destination: ROUTES.myHome, permanent: false },
//       props: {},
//     };
//   }
//   return { props: {} };
// };
