import * as React from "react";

import Head from "next/head";

import { Form, Formik, FormikHelpers } from "formik";
import produce from "immer";
import { toast } from "react-toastify";
import * as yup from "yup";

import { Button, ToastErrorMessage } from "@/components";
import { FormControl } from "@/components/account";
import {
  GetCategoriesWithOffsetDocument,
  GetCategoriesWithOffsetQuery,
  GetCategoriesWithOffsetQueryVariables,
  useCreateCategoryMutation,
} from "@/graphql/generated/schema";
import { gplErrorHandler, isDev } from "@/utils";

const className = {
  control: "mb-4",
};

// validation
const schema = yup.object({
  title: yup.string().required("Title is required."),
});

type IValues = yup.InferType<typeof schema>;

const initialValues: IValues = { title: "" };

interface Props {
  onClose(): void;
}

export default function CreateForm({ onClose }: Props) {
  const titleId = React.useId();
  const [createCategory, { loading, error }] = useCreateCategoryMutation({
    notifyOnNetworkStatusChange: true,
  });

  const onSubmit = async (
    { title }: IValues,
    { resetForm }: FormikHelpers<IValues>,
  ) => {
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
      resetForm();
    }
  };

  React.useEffect(() => {
    const tempErrors = gplErrorHandler(error);
    if (tempErrors) {
      toast.error(<ToastErrorMessage error={tempErrors} />, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
      });
    }
  }, [error]);

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={schema}
    >
      {({
        touched,
        errors,
        values,
        handleChange,
        handleBlur,
        isSubmitting,
        isValid,
        dirty,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit} className="p-4 md:p-6">
          <Head>
            <title>The RAT Diary | Create Category</title>
          </Head>
          <FormControl
            classes={{ root: className.control }}
            id={titleId}
            title="Category Title"
            name="title"
            aria-label="Category Title"
            aria-invalid={Boolean(touched.title && errors.title)}
            type="text"
            valid={!(touched.title && errors.title)}
            errorText={touched.title && errors.title}
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <Button
            className="mx-auto w-full capitalize sm:w-[14.125rem]"
            type="submit"
            aria-label="Save Category"
            loading={isSubmitting || loading}
            disabled={!(isValid && dirty) || isSubmitting || loading}
          >
            Save Category
          </Button>
        </Form>
      )}
    </Formik>
  );
}
