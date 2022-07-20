import { Select } from "@component";
import { NextPageWithLayout } from "@types";
import {
  FormControl,
  PostCreateContainer,
  PostCreateHeader,
} from "components/account";
import { FormikHelpers, useFormik } from "formik";
import { Fragment, ReactElement, useId } from "react";
import * as yup from "yup";

const className = {
  control: "mb-4",
};

interface IValues {
  title: string;
  categories: { name: string; value: string }[];
  tags: { name: string; value: string }[];
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
});

const CreatePost: NextPageWithLayout = () => {
  const initialValues: IValues = {
    title: "",
    categories: [],
    tags: [],
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

  console.log(values);

  return (
    <form>
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
