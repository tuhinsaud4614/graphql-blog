import { GraphQLYogaError } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import path from "path";
import {
  createPost,
  deletePost,
  getPostByIdForUser,
  updatePost,
} from "../services/post.service";
import { imageUpload, nanoid, removeFile } from "../utils";
import {
  CREATION_ERR_MSG,
  DELETE_ERR_MSG,
  NOT_EXIST_ERR_MSG,
} from "../utils/constants";
import {
  ICreatePostInput,
  IUpdatePostInput,
  IUserPayload,
} from "../utils/interfaces";
import { getGraphqlYogaError } from "../validations";
import {
  createPostSchema,
  updatePostSchema,
} from "../validations/post.validation";

export async function createPostCtrl(
  prisma: PrismaClient,
  args: ICreatePostInput,
  user: IUserPayload
) {
  let imagePath;
  try {
    await createPostSchema.validate(args, { abortEarly: false });

    const { image, ...rest } = args;

    const uId = nanoid();
    const dest = path.join(process.cwd(), "images");

    const { name, height, width, filePath } = await imageUpload(
      image,
      dest,
      uId
    );
    imagePath = filePath;
    const post = await createPost(prisma, user.id, {
      ...rest,
      imgUrl: `images/${name}`,
      imgHeight: height,
      imgWidth: width,
    });

    return post;
  } catch (error) {
    removeFile(imagePath);
    console.log(error);
    return getGraphqlYogaError(error, CREATION_ERR_MSG("Post"), "Post input");
  }
}

export async function updatePostCtrl(
  prisma: PrismaClient,
  args: IUpdatePostInput,
  user: IUserPayload
) {
  let imagePath: string | undefined;
  let imageName: string | undefined;
  let imgWidth: number | undefined;
  let imgHeight: number | undefined;
  try {
    await updatePostSchema.validate(args, { abortEarly: false });
    const { image, ...rest } = args;
    const isExist = await getPostByIdForUser(prisma, rest.id, user.id);

    if (!isExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Post"));
    }

    if (image) {
      const uId = nanoid();
      const dest = path.join(process.cwd(), "images");
      const { name, height, width, filePath } = await imageUpload(
        image,
        dest,
        uId
      );
      imagePath = filePath;
      imageName = `images/${name}`;
      imgHeight = height;
      imgWidth = width;
    }

    const post = await updatePost(prisma, {
      ...rest,
      imgUrl: imageName,
      imgHeight: imgHeight,
      imgWidth: imgWidth,
    });
    // console.log(post);

    return post;
  } catch (error) {
    removeFile(imagePath);
    console.log(error);
    return getGraphqlYogaError(error, CREATION_ERR_MSG("Post"), "Post input");
  }
}

export async function deletePostCtrl(
  prisma: PrismaClient,
  id: string,
  user: IUserPayload
) {
  try {
    const isExist = await getPostByIdForUser(prisma, id, user.id);

    if (!isExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Post"));
    }

    const deletedPost = await deletePost(prisma, id);

    return deletedPost.id;
  } catch (error) {
    console.log(error);
    return getGraphqlYogaError(error, DELETE_ERR_MSG("Post"), "Post input");
  }
}
