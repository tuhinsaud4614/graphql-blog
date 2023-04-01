import path from "path";

import logger from "@/logger";
import { fileUpload, imageUpload, nanoid, removeFile } from "@/utils";
import { CREATION_ERR_MSG } from "@/utils/constants";
import {
  getGraphqlYogaError,
  uploadFileSchema,
  uploadImageSchema,
} from "@/validations";

export async function uploadFileCtrl(file: File) {
  let newFilePath;
  try {
    await uploadFileSchema.validate({ file }, { abortEarly: false });

    const uId = nanoid();

    const { name, filePath } = await fileUpload(file, {
      name: uId,
    });
    newFilePath = filePath;

    return `files/${name}`;
  } catch (error) {
    removeFile(newFilePath);
    logger.error(error);
    return getGraphqlYogaError(error, CREATION_ERR_MSG("File"), "File input");
  }
}

export async function uploadImageCtrl(image: File) {
  let newFilePath;
  try {
    await uploadImageSchema.validate({ image }, { abortEarly: false });

    const uId = nanoid();
    const dest = path.join(process.cwd(), "images");

    const { name, filePath } = await imageUpload(image, dest, uId);
    newFilePath = filePath;

    return `images/${name}`;
  } catch (error) {
    removeFile(newFilePath);
    logger.error(error);
    return getGraphqlYogaError(error, CREATION_ERR_MSG("File"), "File input");
  }
}
