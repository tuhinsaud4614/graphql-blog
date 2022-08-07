import { GraphQLYogaError } from "@graphql-yoga/node";
import { GraphQLResolveInfo } from "graphql";
import {
  followRequestCtrl,
  loginCtrl,
  logoutCtrl,
  registerCtrl,
  resendActivationCtrl,
  tokenCtrl,
  unfollowRequestCtrl,
  updateNameCtrl,
  uploadAvatar,
  verifyUserCtrl,
} from "../../controller/user.controller";
import {
  FOLLOW_OWN_ERR_MSG,
  SUBSCRIPTION_FOLLOWING,
  UN_AUTH_ERR_MSG,
  UN_FOLLOW_OWN_ERR_MSG,
} from "../../utils/constants";
import { EFollowingMutationStatus } from "../../utils/enums";
import { ILoginInput, IRegisterInput } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Mutation = {
  async register(
    _: any,
    { data }: { data: IRegisterInput },
    { prisma, req }: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    const result = await registerCtrl(
      prisma,
      data,
      req.headers.origin || "http://localhost:4000"
    );
    return result;
  },

  async resendActivation(
    _: any,
    { userId }: { userId: string },
    { prisma, req }: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    const result = await resendActivationCtrl(
      prisma,
      userId,
      req.headers.origin || "http://localhost:4000"
    );
    return result;
  },

  async verifyUser(
    _: any,
    { userId, code }: { userId: string; code: string },
    { prisma, pubSub }: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    const result = await verifyUserCtrl(prisma, pubSub, userId, code);
    return result;
  },

  async login(
    _: any,
    { data }: { data: ILoginInput },
    { prisma }: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    const result = await loginCtrl(prisma, data);
    return result;
  },

  async logout(
    _: any,
    __: any,
    { user }: YogaContextReturnType,
    ___: GraphQLResolveInfo
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG);
    }
    const result = await logoutCtrl(user);
    return result;
  },

  async token(
    _: any,
    { refreshToken }: { refreshToken: string },
    { prisma }: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    const result = await tokenCtrl(prisma, refreshToken);
    return result;
  },

  async uploadAvatar(
    _: any,
    { avatar }: { avatar: File },
    { prisma, user }: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG);
    }

    const result = await uploadAvatar(prisma, avatar, user);
    return result;
  },

  async updateName(
    _: any,
    { name }: { name: string },
    { prisma, user }: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG);
    }

    const result = await updateNameCtrl(prisma, name, user);
    return result;
  },

  async followRequest(
    _: any,
    { toId }: { toId: string },
    { prisma, user, pubSub }: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG);
    }

    if (user.id === toId) {
      return new GraphQLYogaError(FOLLOW_OWN_ERR_MSG);
    }

    const result = await followRequestCtrl(prisma, toId, user);
    pubSub.publish(SUBSCRIPTION_FOLLOWING(toId), {
      following: {
        followedBy: user,
        mutation: EFollowingMutationStatus.Follow,
      },
    });
    return result;
  },

  async unFollowRequest(
    _: any,
    { toId }: { toId: string },
    { prisma, user, pubSub }: YogaContextReturnType,
    __: GraphQLResolveInfo
  ) {
    if (user === null) {
      return new GraphQLYogaError(UN_AUTH_ERR_MSG);
    }

    if (user.id === toId) {
      return new GraphQLYogaError(UN_FOLLOW_OWN_ERR_MSG);
    }

    const result = await unfollowRequestCtrl(prisma, toId, user);
    pubSub.publish(SUBSCRIPTION_FOLLOWING(toId), {
      following: {
        followedBy: user,
        mutation: EFollowingMutationStatus.Unfollow,
      },
    });
    return result;
  },
};
