import { GraphQLYogaError, PubSub } from "@graphql-yoga/node";
import { Prisma, PrismaClient } from "@prisma/client";
import path from "path";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostByIdForUser,
  getPostByIdWithReactions,
  getPostsByTag,
  getTrendingPosts,
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
  SUBSCRIPTION_REACTIONS,
  UPDATE_ERR_MSG,
} from "../utils/constants";
import { EReactionsMutationStatus, EUserRole } from "../utils/enums";
import {
  ICreatePostInput,
  IPageInfo,
  IPostsByTagQueryParams,
  IPostsQueryParams,
  IUpdatePostInput,
  IUserPayload,
} from "../utils/interfaces";
import { getGraphqlYogaError } from "../validations";
import {
  createPostSchema,
  getAllPostsByTagSchema,
  getAllPostSSchema,
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
    console.log(error);
    return getGraphqlYogaError(error, DELETE_ERR_MSG("Post"), "Post input");
  }
}

export async function reactionToCtrl(
  prisma: PrismaClient,
  // @ts-ignore
  pubSub: PubSub<PubSubPublishArgsByKey>,
  toId: string,
  user: IUserPayload
) {
  try {
    const isExist = await getPostByIdWithReactions(prisma, toId);

    if (!isExist) {
      return new GraphQLYogaError(NOT_EXIST_ERR_MSG("Post"));
    }

    const index = isExist.reactionsBy.findIndex(
      (reactor) => reactor.id === user.id
    );

    if (index === -1) {
      await reactionToPost(prisma, toId, user.id);

      pubSub.publish(SUBSCRIPTION_REACTIONS(toId), {
        reactions: {
          reactBy: user,
          mutation: EReactionsMutationStatus.React,
        },
      });

      return user;
    }

    await reactionWithdrawToPost(prisma, toId, user.id);

    pubSub.publish(SUBSCRIPTION_REACTIONS(toId), {
      reactions: {
        reactBy: user,
        mutation: EReactionsMutationStatus.Withdraw,
      },
    });

    return user;
  } catch (error) {
    console.log(error);
    return getGraphqlYogaError(error, REACTIONS_ERR_MSG);
  }
}

export async function getAllPostsCtrl(
  prisma: PrismaClient,
  params: IPostsQueryParams
) {
  try {
    await getAllPostSSchema.validate(params, { abortEarly: false });

    const { limit, page } = params;
    const condition = {
      where: params.role === EUserRole.User ? { published: true } : undefined,
    };
    let args: Prisma.PostFindManyArgs = {
      ...condition,
      orderBy: { updatedAt: "desc" },
    };

    // limit && page all have value return paginate value

    const count = await prisma.post.count(condition);
    if (limit && page) {
      args = {
        ...args,
        skip: (page - 1) * limit,
        take: limit,
      };
      const result = await getAllPost(prisma, args);

      return {
        data: result,
        total: count,
        pageInfo: {
          hasNext: limit * page < count,
          nextPage: page + 1,
          previousPage: page - 1,
          totalPages: Math.ceil(count / limit),
        } as IPageInfo,
      };
    }

    const result = await prisma.post.findMany(args);
    return { data: result, total: count };
  } catch (error: any) {
    console.log(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("posts"));
  }
}

export async function getTrendingPostsCtrl(prisma: PrismaClient) {
  try {
    const posts = await getTrendingPosts(prisma);
    return posts;
  } catch (error: any) {
    console.log(error);
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
        ...(params.role === EUserRole.User ? { published: true } : undefined),
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
        } as IPageInfo,
      };
    }

    const result = await getPostsByTag(prisma, args);
    return { data: result, total: count };
  } catch (error: any) {
    console.log(error);
    return getGraphqlYogaError(error, FETCH_ERR_MSG("Posts"));
  }
}
