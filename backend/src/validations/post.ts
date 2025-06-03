import { has } from "lodash";
import * as yup from "yup";

import { maxFileSize } from "@/utils";
import {
  IMAGE_MIMES,
  NOT_IMG_ERR_MSG,
  generateArrayLengthErrorMessage,
  generateRequiredErrorMessage,
  generateTooLargeFileErrorMessage,
} from "@/utils/constants";

import { cursorParamsSchema, idParamsSchema, offsetParamsSchema } from ".";

const paragraphSchema = yup.object({
  type: yup.string().oneOf(["paragraph"]).required(),
  data: yup
    .object({
      text: yup.string().required(),
    })
    .required(),
});

const headerSchema = yup.object({
  type: yup.string().oneOf(["header"]).required(),
  data: yup
    .object({
      text: yup.string().required(),
      level: yup.number().integer().min(1).max(6).required(),
    })
    .required(),
});

const listSchema = yup.object({
  type: yup.string().oneOf(["list"]).required(),
  data: yup
    .object({
      style: yup.string().oneOf(["ordered", "unordered"]).required(),
      items: yup.array().of(yup.string()).required(),
    })
    .required(),
});

const imageSchema = yup.object({
  type: yup.string().oneOf(["image"]).required(),
  data: yup
    .object({
      file: yup
        .object({
          url: yup.string().url().required(),
        })
        .required(),
      caption: yup.string().required(),
      withBorder: yup.boolean().required(),
      withBackground: yup.boolean().required(),
      stretched: yup.boolean().required(),
    })
    .required(),
});

const tableSchema = yup.object({
  type: yup.string().oneOf(["table"]).required(),
  data: yup
    .object({
      content: yup
        .array()
        .of(yup.array().of(yup.string().required()))
        .required(),
    })
    .required(),
});

const embedSchema = yup.object({
  type: yup.string().oneOf(["embed"]).required(),
  data: yup
    .object({
      service: yup.string().required(),
      url: yup.string().url().required(),
      embed: yup.string().url().optional(),
      caption: yup.string().optional(),
    })
    .required(),
});

const linkToolSchema = yup.object({
  type: yup.string().oneOf(["linkTool"]).required(),
  data: yup
    .object({
      link: yup.string().url().required(),
      meta: yup.object().required(),
    })
    .required(),
});

// Add other block types similarly

// Combine all block schemas into one
export const blockSchema = yup
  .mixed()
  .test("block-validation", "Invalid block data", (value) => {
    const schemas = [
      paragraphSchema,
      headerSchema,
      listSchema,
      imageSchema,
      tableSchema,
      embedSchema,
      linkToolSchema,
      // Add more schemas here as needed
    ];

    return schemas.some((schema) => {
      try {
        schema.validateSync(value);
        return true;
      } catch {
        return false;
      }
    });
  });

// Define the overall Editor.js schema
const editorJsSchema = yup.object({
  time: yup.number().required(),
  // blocks: yup.array().of(blockSchema).required(),
  blocks: yup.array().of(yup.object()).required(),
  version: yup.string().required(),
});

export const createPostSchema = yup.object({
  title: yup.string().required(generateRequiredErrorMessage("Title")),
  image: yup
    .mixed<File>()
    .required(generateRequiredErrorMessage("Image"))
    .test(
      "fileFormat",
      NOT_IMG_ERR_MSG,
      (value) => !!value && has(IMAGE_MIMES, value.type),
    )
    .test(
      "fileSize",
      generateTooLargeFileErrorMessage("Image", "5 Mb"),
      (value) => !!value && value.size <= maxFileSize(5),
    ),
  categories: yup
    .array()
    .of(yup.string().required(generateRequiredErrorMessage("Categories")))
    .min(1, generateArrayLengthErrorMessage("min", "category", 1))
    .required(generateRequiredErrorMessage("Categories")),
  published: yup.boolean().defined(generateRequiredErrorMessage("Published")),
  content: yup.string().required(generateRequiredErrorMessage("Content")),
  tags: yup
    .array()
    .of(yup.string().required(generateRequiredErrorMessage("Tags")))
    .required(generateRequiredErrorMessage("Tags")),
});

export const updatePostDraftSchema = yup.object({
  id: yup.string().required(generateRequiredErrorMessage("Post ID")),
  draft: editorJsSchema.required(generateRequiredErrorMessage("Draft")),
});

export const publishPostSchema = yup.object({
  id: yup.string().required(generateRequiredErrorMessage("Post ID")),
  title: yup.string().nullable().optional(),
  imageUrl: yup.string().nullable().optional(),
  categories: yup
    .array() // Categories must be an array
    .of(yup.string().required(generateRequiredErrorMessage("Category ID"))) // Each category ID must be a string and is required
    .nullable()
    .optional(),
  tags: yup
    .array() // Tags must be an array
    .of(yup.string().required(generateRequiredErrorMessage("Tag ID"))) // Each tag ID must be a string and is required
    .nullable()
    .optional(),
});

export const updatePostSchema = yup.object({
  id: yup.string().required(generateRequiredErrorMessage("Post ID")),
  title: yup.string(),
  image: yup
    .mixed<File>()
    .test("fileFormat", NOT_IMG_ERR_MSG, (value) => {
      if (value === undefined) return true;
      return !!value && has(IMAGE_MIMES, value.type);
    })
    .test(
      "fileSize",
      generateTooLargeFileErrorMessage("Image", "5 Mb"),
      (value) => {
        if (value === undefined) return true;
        return !!value && value.size <= maxFileSize(5);
      },
    ),
  categories: yup
    .array()
    .of(yup.string().required(generateRequiredErrorMessage("Categories")))
    .min(1, generateArrayLengthErrorMessage("min", "category", 1)),
  published: yup.bool(),
  content: yup.string(),
  tags: yup
    .array()
    .of(yup.string().required(generateRequiredErrorMessage("Tags"))),
});

export const postsByTagSchema = offsetParamsSchema.shape({
  // role: yup
  //   .string()
  //   .required(generateRequiredErrorMessage("Role"))
  //   .oneOf<UserRole>(
  //     ["ADMIN", "AUTHOR"],
  //     generateEitherErrorMessage("Role", "AUTHOR", "ADMIN"),
  //   ),
  tag: yup.string().required(generateRequiredErrorMessage("Tag")),
});

export const postReactedBySchema = idParamsSchema.concat(cursorParamsSchema);
