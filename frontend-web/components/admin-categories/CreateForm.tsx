import { Form, Formik, FormikHelpers } from "formik";
import Head from "next/head";
import * as React from "react";
import * as yup from "yup";

import { Button } from "@component";
import { FormControl } from "components/account";

const className = {
  control: "mb-4",
};

// validation
const schema = yup.object({
  title: yup.string().required("Title is required."),
});

type IValues = yup.InferType<typeof schema>;

const initialValues: IValues = { title: "" };

export default function CreateForm() {
  const titleId = React.useId();

  const onSubmit = async (
    { title }: IValues,
    { resetForm }: FormikHelpers<IValues>,
  ) => {
    try {
    } catch (error) {
      resetForm();
    }
  };
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
            //   loading={isSubmitting || loading}
            loading={isSubmitting}
            disabled={!(isValid && dirty) || isSubmitting}
          >
            Save Category
          </Button>
        </Form>
      )}
    </Formik>
  );
}
