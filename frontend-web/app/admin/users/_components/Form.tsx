"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

// validation
const schema = z.object({
  title: z.string().min(1, "Title is required."),
});

interface Props {
  submitBtnLabel: string;
  submitHandler: (title: string) => Promise<void>;
  loading: boolean;
  defaultValue?: string;
}

export default function AdminTagForm({
  submitBtnLabel,
  submitHandler,
  loading,
  defaultValue,
}: Props) {
  const titleId = React.useId();

  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isDirty },
    register,
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: defaultValue ?? "",
    },
  });

  const onSubmit = handleSubmit(async ({ title }) => {
    await submitHandler(title);
    reset();
  });

  return (
    <form onSubmit={onSubmit} className="p-4 md:p-6">
      <Input
        classes={{ root: "mb-4" }}
        id={titleId}
        title="Tag Title"
        aria-label="Tag Title"
        type="text"
        aria-invalid={!!errors.title}
        valid={!errors.title}
        errorText={errors.title?.message}
        {...register("title")}
        disabled={isSubmitting || loading}
        required
      />
      <Button
        className="mx-auto w-full capitalize sm:w-[14.125rem]"
        type="submit"
        aria-label={submitBtnLabel}
        loading={isSubmitting || loading}
        disabled={!(isDirty && isValid) || isSubmitting || loading}
      >
        {submitBtnLabel}
      </Button>
    </form>
  );
}
