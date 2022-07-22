import { ImagePicker, PostEditor, Select } from "@component";
import { NextPageWithLayout } from "@types";
import {
  FormControl,
  PostCreateContainer,
  PostCreateHeader,
} from "components/account";
import { FormikHelpers, useFormik } from "formik";
import _ from "lodash";
import Head from "next/head";
import { Fragment, ReactElement, useId } from "react";
import { maxFileSize } from "utils";
import { IMAGE_MIMES } from "utils/constants";
import * as yup from "yup";

const className = {
  control: "mb-4",
};

interface IValues {
  title: string;
  categories: { name: string; value: string }[];
  tags: { name: string; value: string }[];
  image: File | null;
}

// validation
const schema = yup.object().shape({
  title: yup.string().required("Post title is required."),
  categories: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Option name is required"),
        value: yup.string().required("Option value is required"),
      })
    )
    .min(1, "At least one category required"),
  tags: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Tag name is required"),
        value: yup.string().required("Tag value is required"),
      })
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
      }
    )
    .test("fileSize", "Image size should be less than 5mb", (value) => {
      if (value === undefined) return true;
      return !!value && value.size <= maxFileSize(2);
    }),
});

const CreatePost: NextPageWithLayout = () => {
  const initialValues: IValues = {
    title: "",
    categories: [],
    tags: [],
    image: null,
  };

  const titleId = useId();
  const categoriesId = useId();
  const tagsId = useId();

  const onSubmit = async (
    values: IValues,
    formikHelpers: FormikHelpers<IValues>
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

  // console.log(values);

  return (
    <form>
      <Head>
        <title>New post – The RAT Diary</title>
        <meta name="title" content="New post – The RAT Diary" />
        <meta
          name="description"
          content="In its most basic form, a post on The RAT Diary consists of title, categories, tags, image & body"
        />
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
      <PostEditor />
    </form>
  );
};

CreatePost.getLayout = (page: ReactElement) => {
  return (
    <Fragment>
      <PostCreateHeader />
      <PostCreateContainer>{page}</PostCreateContainer>
    </Fragment>
  );
};
export default CreatePost;
