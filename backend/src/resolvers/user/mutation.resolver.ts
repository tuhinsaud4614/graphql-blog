import { GraphQLError, type GraphQLResolveInfo } from "graphql";

import {
  followRequestCtrl,
  loginCtrl,
  logoutCtrl,
  registerCtrl,
  resendActivationCtrl,
  resetPasswordCtrl,
  unfollowRequestCtrl,
  updateAboutCtrl,
  updateNameCtrl,
  uploadAvatar,
  verifyResetPasswordCtrl,
  verifyUserCtrl,
} from "@/controller/user.controller";
import { AuthenticationError } from "@/model";
import config from "@/utils/config";
import {
  FOLLOW_OWN_ERR_MSG,
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
  UN_FOLLOW_OWN_ERR_MSG,
} from "@/utils/constants";
import { EAuthorStatus, EFollowingMutationStatus } from "@/utils/enums";
import {
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  YogaContext,
} from "@/utils/types";

export const Mutation = {
  async register(
    _: any,
    { data }: { data: RegisterInput },
    { prisma, req }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    const result = await registerCtrl(
      prisma,
      data,
      req.headers.origin || config.CLIENT_ENDPOINT,
    );
    return result;
  },

  async resendActivation(
    _: any,
    { userId }: { userId: string },
    { prisma, req }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    const result = await resendActivationCtrl(
      prisma,
      userId,
      req.headers.origin || config.CLIENT_ENDPOINT,
    );
    return result;
  },

  async verifyUser(
    _: any,
    { userId, code }: { userId: string; code: string },
    { prisma, pubSub }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    const verifiedUserId = await verifyUserCtrl(prisma, userId, code);
    if (!(verifiedUserId instanceof GraphQLError)) {
      pubSub.publish("verifyUser", verifiedUserId, {
        mutation: EAuthorStatus.Verified,
        userId: verifiedUserId,
      });
    }
    return verifiedUserId;
  },

  async login(
    _: any,
    { data }: { data: LoginInput },
    { prisma, res }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    const result = await loginCtrl(prisma, data, res);
    return result;
  },

  async logout(
    _: any,
    __: any,
    { user, req, res }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }
    const result = await logoutCtrl(user, req, res);
    return result;
  },

  async resetPassword(
    _: any,
    { newPassword, oldPassword }: ResetPasswordInput,
    { prisma, user, req }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }
    const result = await resetPasswordCtrl(
      prisma,
      user.id,
      oldPassword,
      newPassword,
      req.headers.origin,
    );
    return result;
  },

  async verifyResetPassword(
    _: any,
    { code }: { code: string },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }
    const result = await verifyResetPasswordCtrl(prisma, user.id, code);
    return result;
  },

  async uploadAvatar(
    _: any,
    { avatar }: { avatar: File },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new GraphQLError(UN_AUTH_ERR_MSG, {
        extensions: {
          code: UN_AUTH_EXT_ERR_CODE,
        },
      });
    }

    const result = await uploadAvatar(prisma, avatar, user);
    return result;
  },

  async updateName(
    _: any,
    { name }: { name: string },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new GraphQLError(UN_AUTH_ERR_MSG, {
        extensions: {
          code: UN_AUTH_EXT_ERR_CODE,
        },
      });
    }

    const result = await updateNameCtrl(prisma, name, user);
    return result;
  },

  async updateAbout(
    _: any,
    { value }: { value: string },
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new GraphQLError(UN_AUTH_ERR_MSG, {
        extensions: {
          code: UN_AUTH_EXT_ERR_CODE,
        },
      });
    }

    const result = await updateAboutCtrl(prisma, value, user);
    return result;
  },

  async followRequest(
    _: any,
    { toId }: { toId: string },
    { prisma, user, pubSub }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new GraphQLError(UN_AUTH_ERR_MSG, {
        extensions: {
          code: UN_AUTH_EXT_ERR_CODE,
        },
      });
    }

    if (user.id === toId) {
      return new GraphQLError(FOLLOW_OWN_ERR_MSG);
    }

    const result = await followRequestCtrl(prisma, toId, user);
    pubSub.publish("following", toId, {
      followedBy: user,
      mutation: EFollowingMutationStatus.Follow,
    });
    return result;
  },

  async unFollowRequest(
    _: any,
    { toId }: { toId: string },
    { prisma, user, pubSub }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new GraphQLError(UN_AUTH_ERR_MSG, {
        extensions: {
          code: UN_AUTH_EXT_ERR_CODE,
        },
      });
    }

    if (user.id === toId) {
      return new GraphQLError(UN_FOLLOW_OWN_ERR_MSG);
    }

    const result = await unfollowRequestCtrl(prisma, toId, user);
    pubSub.publish("following", toId, {
      followedBy: user,
      mutation: EFollowingMutationStatus.Unfollow,
    });
    return result;
  },
};
