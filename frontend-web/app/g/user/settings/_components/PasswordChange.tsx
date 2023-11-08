"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ErrorModal from "@/components/ErrorModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useResetPasswordMutation } from "@/graphql/generated/schema";
import { ROUTES } from "@/lib/constants";
import { gplErrorHandler } from "@/lib/utils";

const schema = z.object({
  oldPassword: z.string().min(1, "Old password is required."),
  newPassword: z.string().min(1, "New password is required."),
});

export default function PasswordChange() {
  const [editable, setEditable] = React.useState(false);
  const newPasswordId = React.useId();
  const oldPasswordId = React.useId();

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    register,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      oldPassword: "",
    },
  });

  const [resetPassword, { loading, error, reset: mutationReset }] =
    useResetPasswordMutation({
      errorPolicy: "all",
    });

  const onSubmit = handleSubmit(async ({ newPassword, oldPassword }) => {
    try {
      const { data } = await resetPassword({
        variables: {
          newPassword,
          oldPassword,
          verificationLink: ROUTES.account.verifyPasswordReset,
        },
      });
      if (data) {
        toast.success(data.resetPassword, {
          position: "top-center",
        });
        reset();
        setEditable(false);
      }
    } catch (error) {
      reset();
    }
  });

  return (
    <>
      <li>
        <form
          onSubmit={onSubmit}
          className="flex flex-wrap items-center justify-between space-y-3 py-8 sm:flex-nowrap"
        >
          <div className="flex max-w-md flex-auto flex-col pr-3">
            <label className="mb-3 !text-xl font-bold text-neutral selection:bg-primary selection:text-primary-foreground">
              Password change
            </label>
            {!editable ? (
              <p className="mt-2 text-sm text-neutral/60 selection:bg-primary selection:text-primary-foreground">
                You can change your password. That will help you to log in.
              </p>
            ) : (
              <>
                <Input
                  classes={{
                    label:
                      "text-left self-start selection:bg-primary selection:text-primary-foreground",
                    input: "!text-left pb-2",
                  }}
                  id={oldPasswordId}
                  title="Old password"
                  aria-label="Old password"
                  placeholder="Your old password"
                  aria-invalid={!!errors.oldPassword}
                  type="password"
                  valid={!errors.oldPassword}
                  errorText={errors.oldPassword?.message}
                  {...register("oldPassword")}
                  required
                />
                <Input
                  classes={{
                    root: "mt-4",
                    label:
                      "text-left self-start selection:bg-primary selection:text-primary-foreground",
                    input: "!text-left pb-2",
                  }}
                  id={newPasswordId}
                  title="New password"
                  aria-label="New password"
                  placeholder="Your new password"
                  aria-invalid={!!errors.newPassword}
                  type="password"
                  valid={!errors.newPassword}
                  errorText={errors.newPassword?.message}
                  {...register("newPassword")}
                  required
                />
              </>
            )}
          </div>
          <div className="flex shrink-0 self-start">
            {editable && (
              <Button
                className="mr-2 text-sm"
                type="submit"
                aria-label="Save"
                variant="success"
                mode="outline"
                loading={isSubmitting || loading}
                disabled={!(isDirty && isValid) || isSubmitting}
              >
                Save
              </Button>
            )}
            <Button
              className="text-sm"
              type="button"
              aria-label={editable ? "Cancel" : "Edit"}
              variant="neutral"
              mode="outline"
              disabled={isSubmitting}
              onClick={() => setEditable((prev) => !prev)}
            >
              {editable ? "Cancel" : "Edit"}
            </Button>
          </div>
        </form>
      </li>
      <ErrorModal
        onClose={() => void mutationReset()}
        title="Reset Password Errors"
        errors={gplErrorHandler(error)}
      />
    </>
  );
}
