import * as React from "react";

import Head from "next/head";

import { FormikHelpers, useFormik } from "formik";
import _ from "lodash";
import { Descendant } from "slate";
import * as yup from "yup";

import {
  Button,
  CheckInput,
  ImagePicker,
  PostEditor,
  Select,
} from "@/components";
import {
  FormControl,
  PostCreateContainer,
  PostCreateHeader,
} from "@/components/account";
import { maxFileSize } from "@/utils";
import { IMAGE_MIMES } from "@/utils/constants";
import { NextPageWithLayout } from "@/utils/types";

const className = {
  control: "mb-4",
};

interface IValues {
  title: string;
  categories: { name: string; value: string }[];
  tags: { name: string; value: string }[];
  image: File | null;
  body: Descendant[];
  published: boolean;
}

const initialBodyValue: Descendant[] = [
  {
    children: [{ text: "" }],
  },
];

// validation
const schema = yup.object().shape({
  title: yup.string().required("Post title is required."),
  categories: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Option name is required"),
        value: yup.string().required("Option value is required"),
      }),
    )
    .min(1, "At least one category required"),
  tags: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Tag name is required"),
        value: yup.string().required("Tag value is required"),
      }),
    )
    .min(1, "At least one tag required"),
  image: yup
    .mixed<File>()
    .required("Image is required")
    .test(
      "fileFormat",
      "File should be image (gif, svg, jpeg, jpg, png, webp)",
      (value) => {
        if (value === undefined) return true;
        return !!value && _.has(IMAGE_MIMES, value.type);
      },
    )
    .test("fileSize", "Image size should be less than 5mb", (value) => {
      if (value === undefined) return true;
      return !!value && value.size <= maxFileSize(5);
    }),
  published: yup.boolean(),
});

const EditPost: NextPageWithLayout = () => {
  const initialValues: IValues = {
    title: "",
    categories: [],
    tags: [],
    image: null,
    body: initialBodyValue,
    published: false,
  };

  const titleId = React.useId();
  const categoriesId = React.useId();
  const tagsId = React.useId();
  const publishedId = React.useId();

  const onSubmit = async (
    values: IValues,
    formikHelpers: FormikHelpers<IValues>,
  ) => {};

  const {
    handleSubmit,
    touched,
    handleChange,
    handleBlur,
    errors,
    isValid,
    dirty,
    values,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema: schema,
  });

  // console.log(JSON.stringify(values));

  return (
    <form onSubmit={handleSubmit}>
      <Head>
        <title>Editing new – The RAT Diary</title>
      </Head>
      <FormControl
        classes={{ root: className.control }}
        id={titleId}
        title="Post title"
        name="title"
        aria-label="Post title"
        aria-invalid={Boolean(touched.title && errors.title)}
        valid={!(touched.title && errors.title)}
        errorText={touched.title && errors.title}
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <Select
        classes={{ root: className.control }}
        id={categoriesId}
        title="Post categories"
        name="categories"
        aria-label="Post categories"
        aria-invalid={Boolean(touched.categories && errors.categories)}
        placeholder="Select categories..."
        values={values.categories}
        onChangeValues={(val) => setFieldValue("categories", val)}
        onBlur={() => {
          if (!touched.categories) setFieldTouched("categories", true);
        }}
        valid={!(touched.categories && errors.categories)}
        errorText={
          touched.categories &&
          typeof errors.categories === "string" &&
          errors.categories
        }
        loadOptions={async (value) => {
          const p = new Promise<{ name: string; value: string }[]>((res) => {
            if (!value) {
              return res([]);
            }
            setTimeout(() => {
              res([{ name: value.toUpperCase(), value }]);
            }, 500);
          });
          const result = await p;
          return result;
        }}
        required
      />
      <Select
        classes={{ root: className.control }}
        id={tagsId}
        title="Post tags"
        name="tags"
        aria-label="Post tags"
        aria-invalid={Boolean(touched.tags && errors.tags)}
        placeholder="Select tags..."
        values={values.tags}
        onChangeValues={(val) => setFieldValue("tags", val)}
        onBlur={() => {
          if (!touched.tags) setFieldTouched("tags", true);
        }}
        valid={!(touched.tags && errors.tags)}
        errorText={
          touched.tags && typeof errors.tags === "string" && errors.tags
        }
        loadOptions={async (value) => {
          const p = new Promise<{ name: string; value: string }[]>((res) => {
            if (!value) {
              return res([]);
            }
            setTimeout(() => {
              res([{ name: value.toUpperCase(), value }]);
            }, 500);
          });
          const result = await p;
          return result;
        }}
        required
      />
      <ImagePicker
        title="Post image"
        name="image"
        aria-label="Post image"
        aria-invalid={Boolean(touched.image && errors.image)}
        classes={{ container: className.control }}
        value={values.image}
        onFileChange={(file) => setFieldValue("image", file)}
        onTouched={() => {
          if (!touched.image) setFieldTouched("image", true);
        }}
        valid={!(touched.image && errors.image)}
        errorText={touched.image && errors.image}
        required
      />
      <PostEditor
        value={values.body}
        onChange={(value) => setFieldValue("body", value)}
      />
      <div className="mt-3 w-52">
        <CheckInput
          label="Published"
          id={publishedId}
          name="published"
          aria-label="Post published"
          aria-checked={values.published}
          checked={values.published}
          onChange={(e) => setFieldValue("published", e.target.checked)}
        />
      </div>
      <div className="flex justify-center pb-3 pt-5">
        <Button
          className="w-[14.125rem] !py-2 px-5 "
          type="submit"
          aria-label="Save"
          loading={isSubmitting}
          disabled={!(isValid && dirty) || isSubmitting}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

EditPost.getLayout = (page: React.ReactElement) => {
  return (
    <React.Fragment>
      <PostCreateHeader />
      <PostCreateContainer>{page}</PostCreateContainer>
    </React.Fragment>
  );
};
export default EditPost;
