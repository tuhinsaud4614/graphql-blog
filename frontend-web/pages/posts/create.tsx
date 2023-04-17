import { useId } from "react";

import { NextPage } from "next";
import Head from "next/head";

import { FormikHelpers, useFormik } from "formik";
import _ from "lodash";
import { toast } from "react-toastify";
import { Descendant } from "slate";
import * as yup from "yup";

import {
  AuthGuard,
  Button,
  CheckInput,
  ClientOnly,
  ErrorModal,
  ImagePicker,
  PostEditor,
  Select,
} from "@/components";
import {
  FormControl,
  PostCreateContainer,
  PostCreateHeader,
} from "@/components/account";
import {
  UserRole,
  useCreatePostMutation,
  useGetCategoriesByTextOnOffsetLazyQuery,
  useGetTagsByTextOnOffsetLazyQuery,
} from "@/graphql/generated/schema";
import {
  gplErrorHandler,
  maxFileSize,
  readLocalStorageValue,
  removeLocalStorageValue,
} from "@/utils";
import { CREATE_POST_KEY, IMAGE_MIMES } from "@/utils/constants";

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

const initialBodyValue: Descendant[] = JSON.parse(
  readLocalStorageValue(CREATE_POST_KEY) || '[{"children":[{"text":""}]}]',
);

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

const CreatePost: NextPage = () => {
  const initialValues: IValues = {
    title: "",
    categories: [],
    tags: [],
    image: null,
    body: initialBodyValue,
    published: false,
  };

  const titleId = useId();
  const categoriesId = useId();
  const tagsId = useId();
  const publishedId = useId();

  const [fetchCategories] = useGetCategoriesByTextOnOffsetLazyQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [fetchTags] = useGetTagsByTextOnOffsetLazyQuery({
    notifyOnNetworkStatusChange: true,
  });

  const [createPost, { loading, error, reset }] = useCreatePostMutation({
    notifyOnNetworkStatusChange: true,
  });

  const onSubmit = async (
    { body, categories, image, published, tags, title }: IValues,
    { resetForm }: FormikHelpers<IValues>,
  ) => {
    try {
      const { data } = await createPost({
        variables: {
          data: {
            content: JSON.stringify(body),
            categories: categories.map((cat) => cat.value),
            tags: tags.map((tag) => tag.value),
            image,
            published,
            title,
          },
        },
      });
      if (data) {
        toast.success(`${data.createPost.title} post created successfully!`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
        });
        removeLocalStorageValue(CREATE_POST_KEY);
        resetForm();
      }
    } catch (error) {
      resetForm();
    }
  };

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

  return (
    <AuthGuard role={UserRole.Author}>
      <ClientOnly>
        <PostCreateHeader />
        <PostCreateContainer>
          <form onSubmit={handleSubmit}>
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
                try {
                  const { data } = await fetchCategories({
                    variables: { text: value || "" },
                  });
                  if (data) {
                    return data.categoriesByTextOnOffset.data.map(
                      (category) => ({
                        name: category.title,
                        value: category.id,
                      }),
                    );
                  }
                  return [];
                } catch (error) {
                  return [];
                }
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
                try {
                  if (value) {
                    value = value.trim();
                    const { data } = await fetchTags({
                      variables: { text: value || "" },
                    });
                    if (data) {
                      if (data.tagsByTextOnOffset.results.length === 0) {
                        return [{ name: value, value }];
                      }
                      return data.tagsByTextOnOffset.results.map((tag) => ({
                        name: tag.title,
                        value: tag.title,
                      }));
                    }
                  }
                  return [];
                } catch (error) {
                  return [];
                }
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
                loading={isSubmitting || loading}
                disabled={!(isValid && dirty) || isSubmitting}
              >
                Save
              </Button>
            </div>
          </form>
          <ErrorModal
            onClose={() => reset()}
            title="Create Post Errors"
            errors={gplErrorHandler(error)}
          />
        </PostCreateContainer>
      </ClientOnly>
    </AuthGuard>
  );
};

export default CreatePost;
