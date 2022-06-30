import { PrismaClient } from "@prisma/client";
import path from "path";
import { imageUpload, nanoid } from "../utils";
import { CREATION_ERR_MSG } from "../utils/constants";
import { IPostInput, IUserPayload } from "../utils/interfaces";
import { getGraphqlYogaError } from "../validations";
import { createPostSchema } from "../validations/user.validation";

export async function createPostCtrl(
  prisma: PrismaClient,
  args: IPostInput,
  user: IUserPayload
) {
  try {
    await createPostSchema.validate(args, { abortEarly: false });

    const { categories, content, image, published, tags, title } = args;

    const uId = nanoid();
    const dest = path.join(process.cwd(), "images");

    const { name, height, width } = await imageUpload(image, dest, uId);

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: user.id,
        categories: {
          connect: categories.map((category) => ({ id: category })),
        },
        image: {
          create: {
            url: `images/${name}`,
            width: width || 200,
            height: height || 200,
          },
        },
        published,
        publishedAt: published ? new Date() : undefined,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            create: { title: tag },
            where: { title: tag },
          })),
        },
      },
    });
    console.log(post);

    return post;
  } catch (error) {
    console.log(error);
    return getGraphqlYogaError(error, CREATION_ERR_MSG("Post"), "Post input");
  }
}
