"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { produce } from "immer";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import ToastErrorMessage from "@/components/ToastErrorMessage";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  GetCategoriesWithOffsetDocument,
  GetCategoriesWithOffsetQuery,
  GetCategoriesWithOffsetQueryVariables,
  useCreateCategoryMutation,
} from "@/graphql/generated/schema";
import { isDev } from "@/lib/isType";
import { gplErrorHandler } from "@/lib/utils";

// validation
const schema = z.object({
  title: z.string().min(1, "Title is required."),
});

interface Props {
  onClose(): void;
}

export default function AdminCategoryCreationForm({ onClose }: Props) {
  const titleId = React.useId();
  const [createCategory, { loading }] = useCreateCategoryMutation({
    notifyOnNetworkStatusChange: true,
    onError(error) {
      const tempErrors = gplErrorHandler(error);
      if (tempErrors) {
        toast.error(<ToastErrorMessage error={tempErrors} />, {
          position: "bottom-right",
        });
      }
    },
    onCompleted(data) {
      toast.success(
        <>
          <b className="capitalize">{data.createCategory.title}</b> created
          successfully.
        </>,
        {
          position: "top-right",
        },
      );
    },
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
      title: "",
    },
  });

  const onSubmit = handleSubmit(async ({ title }) => {
    try {
      await createCategory({
        variables: { title },
        update(cache, { data }) {
          if (!data) {
            return;
          }
          try {
            cache.updateQuery<
              GetCategoriesWithOffsetQuery,
              GetCategoriesWithOffsetQueryVariables
            >(
              {
                query: GetCategoriesWithOffsetDocument,
                variables: { limit: 10, page: 1 },
              },
              (prevCategories) => {
                const newCategory = data.createCategory;

                if (
                  !prevCategories ||
                  prevCategories.categoriesWithOffset.total === 0
                ) {
                  return {
                    categoriesWithOffset: {
                      data: [newCategory],
                      total: 1,
                    },
                  };
                }

                const newCategories = produce(prevCategories, (draft) => {
                  draft.categoriesWithOffset.data = [
                    newCategory,
                    ...draft.categoriesWithOffset.data,
                  ];
                  draft.categoriesWithOffset.total += 1;
                });
                return newCategories;
              },
            );
          } catch (error) {
            isDev() && console.log(error);
          }
        },
      });
      onClose();
    } catch (error) {
      reset();
    }
  });

  return (
    <form onSubmit={onSubmit} className="p-4 md:p-6">
      <Input
        classes={{ root: "mb-4" }}
        id={titleId}
        title="Category Title"
        aria-label="Category Title"
        type="text"
        aria-invalid={!!errors.title}
        valid={!errors.title}
        errorText={errors.title?.message}
        {...register("title")}
        required
      />
      <Button
        className="mx-auto w-full capitalize sm:w-[14.125rem]"
        type="submit"
        aria-label="Save Category"
        loading={isSubmitting || loading}
        disabled={!(isDirty && isValid) || isSubmitting || loading}
      >
        Save Category
      </Button>
    </form>
  );
}
