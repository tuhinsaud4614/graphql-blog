import path from "path";

import logger from "@/logger";
import { UnknownError } from "@/model";
import { fileUpload, formatError, imageUpload, nanoid } from "@/utils";
import { generateCreationErrorMessage } from "@/utils/constants";
import type { FileParams, ImageParams } from "@/utils/types";
import { fileParamsSchema, imageParamsSchema } from "@/validations";

/**
 * This function uploads a file and returns its path.
 * @param {FileParams} params - The `params` parameter is an object that contains the following
 * properties:
 * @returns a string that represents the path of the uploaded file. The path is in the format
 * "files/{name}", where {name} is a unique identifier generated using the nanoid library. If there is
 * an error during the file upload process, the function returns an instance of the UnknownError class
 * with a message indicating that there was an error creating the file.
 */
export async function uploadFileService(params: FileParams) {
  try {
    await fileParamsSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "upload file" });
  }

  try {
    const uId = nanoid();
    const { name } = await fileUpload(params.file, {
      name: uId,
    });
    return `files/${name}`;
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateCreationErrorMessage("File"));
  }
}

/**
 * This function uploads an image and returns its file path.
 * @param {ImageParams} params - The `params` parameter is an object that contains the following
 * properties:
 * @returns a string that represents the path to the uploaded image file. If there is an error during
 * the validation or upload process, it will return an error object.
 */
export async function uploadImageService(params: ImageParams) {
  try {
    await imageParamsSchema.validate(params, {
      abortEarly: false,
    });
  } catch (error) {
    logger.error(error);
    return formatError(error, { key: "upload image" });
  }
  try {
    const uId = nanoid();
    const dest = path.join(process.cwd(), "images");

    const { name } = await imageUpload(params.image, dest, uId);
    return `images/${name}`;
  } catch (error) {
    logger.error(error);
    return new UnknownError(generateCreationErrorMessage("Image"));
  }
}
