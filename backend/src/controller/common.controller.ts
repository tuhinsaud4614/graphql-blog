import path from "path";

import logger from "@/logger";
import { fileUpload, imageUpload, nanoid, removeFile } from "@/utils";
import { generateCreationErrorMessage } from "@/utils/constants";
import {
  fileParamsSchema,
  getGraphqlYogaError,
  imageParamsSchema,
} from "@/validations";

export async function uploadFileCtrl(file: File) {
  let newFilePath;
  try {
    await fileParamsSchema.validate({ file }, { abortEarly: false });

    const uId = nanoid();

    const { name, filePath } = await fileUpload(file, {
      name: uId,
    });
    newFilePath = filePath;

    return `files/${name}`;
  } catch (error) {
    removeFile(newFilePath);
    logger.error(error);
    return getGraphqlYogaError(
      error,
      generateCreationErrorMessage("File"),
      "File input",
    );
  }
}

export async function uploadImageCtrl(image: File) {
  let newFilePath;
  try {
    await imageParamsSchema.validate({ image }, { abortEarly: false });

    const uId = nanoid();
    const dest = path.join(process.cwd(), "images");

    const { name, filePath } = await imageUpload(image, dest, uId);
    newFilePath = filePath;

    return `images/${name}`;
  } catch (error) {
    removeFile(newFilePath);
    logger.error(error);
    return getGraphqlYogaError(
      error,
      generateCreationErrorMessage("File"),
      "File input",
    );
  }
}
