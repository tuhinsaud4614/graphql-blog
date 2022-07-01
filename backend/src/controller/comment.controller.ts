import { GraphQLYogaError } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";
import { getPostById } from "../services/post.service";
import { CREATION_ERR_MSG, NOT_EXIST_ERR_MSG } from "../utils/constants";
import { IUserPayload } from "../utils/interfaces";
import { getGraphqlYogaError } from "../validations";
import { createCommentSchema } from "../validations/comment.validation";

export async function createCommentCtrl(
  prisma: PrismaClient,
  postId: string,
  content: string,
  user: IUserPayload,
  parentComment?: string
) {
  try {
    await createCommentSchema.validate(
      { postId, content, parentComment },
      { abortEarly: false }
    );

    // If parent comment is valid thats means it's a reply
    if (parentComment) {
      const parent = await prisma.comment.findFirst({
        where: { id: parentComment, postId: postId },
      });

      if (!parent) {
        return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Comment"));
      }

      const comment = await prisma.comment.create({
        data: {
          content,
          commenter: { connect: { id: user.id } },
          parentComment: { connect: { id: parent.id } },
        },
      });
      return comment;
    }

    const isExist = await getPostById(prisma, postId);
    if (!isExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Post"));
    }

    const comment = await prisma.comment.create({
      data: {
        content: content,
        commenter: {
          connect: {
            id: user.id,
          },
        },
        post: {
          connect: {
            id: isExist.id,
          },
        },
      },
    });

    return comment;
  } catch (error) {
    console.log(error);
    return getGraphqlYogaError(error, CREATION_ERR_MSG("Comment"));
  }
}
