import { GraphQLYogaError } from "@graphql-yoga/node";
import { Prisma, PrismaClient } from "@prisma/client";
import path from "path";
import logger from "../logger";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  getPostByIdForUser,
  getPostCommentsCount,
  getPostReactionsByOnCursor,
  getPostReactionsCount,
  getPostsByTag,
  getPostsOnCursor,
  getPostsOnOffset,
  isReactToThePost,
  reactionToPost,
  reactionWithdrawToPost,
  updatePost,
} from "../services/post.service";
import { imageUpload, nanoid, removeFile } from "../utils";
import {
  CREATION_ERR_MSG,
  DELETE_ERR_MSG,
  FETCH_ERR_MSG,
  NOT_EXIST_ERR_MSG,
  REACTIONS_ERR_MSG,
  UPDATE_ERR_MSG,
} from "../utils/constants";
import { YogaPubSubType } from "../utils/context";
import { EReactionsMutationStatus } from "../utils/enums";
import {
  ICreatePostInput,
  ICursorQueryParams,
  IOffsetPageInfo,
  IOffsetQueryParams,
  IPostsByTagQueryParams,
  IReactionsCount,
  IUpdatePostInput,
  IUserPayload,
} from "../utils/interfaces";
import { getGraphqlYogaError } from "../validations";
import {
  createPostSchema,
  cursorQueryParamsSchema,
  getAllPostsByTagSchema,
  offsetQueryParamsSchema,
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
    logger.error(error);
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
    logger.error(error);
    return getGraphqlYogaError(error, UPDATE_ERR_MSG("Post"), "Post input");
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
    logger.error(error);
    return getGraphqlYogaError(error, DELETE_ERR_MSG("Post"), "Post input");
  }
}

export async function reactionToCtrl(
  prisma: PrismaClient,
  // pubSub: PubSub<PubSubPublishArgsByKey>,
  pubSub: YogaPubSubType,
  toId: string,
  user: IUserPayload
) {
  try {
    const isExist = await getPostById(prisma, toId);

    if (!isExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Post"));
    }
    const isReacted = await isReactToThePost(prisma, toId, user.id);

    if (!isReacted) {
      await reactionToPost(prisma, toId, user.id);

      const result = {
        reactBy: user,
        mutation: EReactionsMutationStatus.React,
      };

      pubSub.publish("reactions", toId, result);

      return EReactionsMutationStatus.React;
    }

    await reactionWithdrawToPost(prisma, toId, user.id);

    const result = {
      reactBy: user,
      mutation: EReactionsMutationStatus.Withdraw,
    };

    pubSub.publish("reactions", toId, result);

    return EReactionsMutationStatus.Withdraw;
  } catch (error) {
    logger.error(error);
    return getGraphqlYogaError(error, REACTIONS_ERR_MSG);
  }
}

// Offset based pagination start
export async function getAllPostsOnOffsetCtrl(
  prisma: PrismaClient,
  params: IOffsetQueryParams
) {
  try {
    await offsetQueryParamsSchema.validate(params, { abortEarly: false });

    const { limit, page } = params;
    const condition = {
      where: { published: true },
    };
    let args: Prisma.PostFindManyArgs = {
      ...condition,
      orderBy: { updatedAt: "desc" },
    };

    // limit && page all have value return paginate value

    const count = await prisma.post.count(condition);

    if (count === 0) {
      return { data: [], total: count };
    }

    const result = await getPostsOnOffset(prisma, count, page, limit, args);

    return result;
  } catch (error: any) {
    logger.error(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("posts"));
  }
}
// Offset based pagination end

// Cursor based pagination start
export async function getAllPostsCtrl(
  prisma: PrismaClient,
  params: ICursorQueryParams
) {
  try {
    await cursorQueryParamsSchema.validate(params, { abortEarly: false });

    const args: Prisma.PostFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      where: { published: true },
    };

    const count = await prisma.post.count({ where: { published: true } });
    const result = await getPostsOnCursor(prisma, params, args, count);
    return result;
  } catch (error: any) {
    logger.error(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("posts"));
  }
}
// Cursor based pagination start

export async function getTrendingPostsCtrl(prisma: PrismaClient) {
  try {
    const posts = await getAllPosts(prisma, {
      take: 6,
      where: { published: true },
      orderBy: [
        {
          reactionsBy: { _count: "desc" },
        },
        {
          comments: { _count: "desc" },
        },
      ],
    });
    // throw new GraphQLYogaError("hello");

    return posts;
  } catch (error: any) {
    logger.error(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("posts"));
  }
}

export async function getFollowingAuthorPostsCtrl(
  prisma: PrismaClient,
  params: ICursorQueryParams,
  userId: string
) {
  try {
    await cursorQueryParamsSchema.validate(params, { abortEarly: false });

    const condition = {
      where: {
        published: true,
        author: { followers: { some: { id: userId } } },
      } as Prisma.PostWhereInput,
    };

    const args: Prisma.PostFindManyArgs = {
      orderBy: { updatedAt: "desc" },
      ...condition,
    };

    const count = await prisma.post.count(condition);
    const result = await getPostsOnCursor(prisma, params, args, count);
    return result;
  } catch (error: any) {
    logger.error(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("posts"));
  }
}

export async function getAllPostsByTagCtrl(
  prisma: PrismaClient,
  params: IPostsByTagQueryParams
) {
  try {
    await getAllPostsByTagSchema.validate(params, { abortEarly: false });

    const { limit, page, tag } = params;

    const condition = {
      where: {
        published: true,
        tags: { some: { title: tag } },
      },
    };

    let args: Prisma.PostFindManyArgs = {
      ...condition,
      orderBy: {
        updatedAt: "desc",
      },
    };
    // limit && page all have value return paginate value
    const count = await prisma.post.count(condition);

    if (limit && page) {
      args = {
        ...args,
        skip: (page - 1) * limit,
        take: limit,
      };
      const result = await getPostsByTag(prisma, args);

      return {
        data: result,
        total: count,
        pageInfo: {
          hasNext: limit * page < count,
          nextPage: page + 1,
          previousPage: page - 1,
          totalPages: Math.ceil(count / limit),
        } as IOffsetPageInfo,
      };
    }

    const result = await getPostsByTag(prisma, args);
    return { data: result, total: count };
  } catch (error: any) {
    logger.error(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("Posts"));
  }
}

export async function postReactionsCountCtrl(
  prisma: PrismaClient,
  userId: string,
  postId: string
) {
  try {
    const [count, isReacted] = await prisma.$transaction([
      getPostReactionsCount(prisma, postId),
      isReactToThePost(prisma, postId, userId),
    ]);

    return {
      count: count?._count.reactionsBy ?? 0,
      reacted: !!isReacted,
    } as IReactionsCount;
  } catch (error: any) {
    logger.error(error);
    return getGraphqlYogaError(error, "Post reactions counting failed");
  }
}

export async function postCommentsCountCtrl(
  prisma: PrismaClient,
  postId: string
) {
  try {
    const result = await getPostCommentsCount(prisma, postId);
    return result?._count.comments ?? 0;
  } catch (error: any) {
    logger.error(error);
    return getGraphqlYogaError(error, "Post comments counting failed");
  }
}

export async function postReactionsByCtrl(
  prisma: PrismaClient,
  postId: string,
  params: ICursorQueryParams
) {
  try {
    await cursorQueryParamsSchema.validate(params, { abortEarly: false });

    const result = await getPostReactionsByOnCursor(prisma, postId, params);

    return result;
  } catch (error: any) {
    logger.error(error);
    return getGraphqlYogaError(error, "Post reactors fetching failed");
  }
}
