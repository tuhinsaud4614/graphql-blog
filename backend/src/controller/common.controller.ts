import { fileUpload, nanoid, removeFile } from "../utils";
import { CREATION_ERR_MSG } from "../utils/constants";
import { getGraphqlYogaError, uploadFileSchema } from "../validations";

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
    console.log(error);
    return getGraphqlYogaError(error, CREATION_ERR_MSG("File"), "File input");
  }
}
