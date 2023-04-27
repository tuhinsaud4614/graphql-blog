import { GraphQLError, type GraphQLResolveInfo } from "graphql";

import { unfollowRequestCtrl } from "@/controller/user.controller";
import { AuthenticationError, ForbiddenError } from "@/model";
import {
  followRequestService,
  loginService,
  logoutService,
  resendActivationService,
  resetPasswordService,
  updateAboutService,
  updateNameService,
  uploadAvatarService,
  userRegistrationService,
  verifyResetPasswordService,
  verifyUserService,
} from "@/services/user";
import config from "@/utils/config";
import {
  FOLLOW_OWN_ERR_MSG,
  UN_AUTH_ERR_MSG,
  UN_AUTH_EXT_ERR_CODE,
  UN_FOLLOW_OWN_ERR_MSG,
} from "@/utils/constants";
import { EFollowingMutationStatus } from "@/utils/enums";
import type {
  IDParams,
  ImageParams,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
  UpdateAboutParams,
  UpdateNameParams,
  VerifyCodeParams,
  VerifyUserParams,
  YogaContext,
} from "@/utils/types";

export const Mutation = {
  async register(
    _: unknown,
    { data }: { data: RegisterInput },
    { prisma, req }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    return await userRegistrationService(
      prisma,
      data,
      req.headers.origin || config.CLIENT_ENDPOINT,
    );
  },

  async resendActivation(
    _: unknown,
    params: IDParams,
    { prisma, req }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    const result = await resendActivationService(
      prisma,
      params,
      req.headers.origin || config.CLIENT_ENDPOINT,
    );
    return result;
  },

  async verifyUser(
    _: unknown,
    params: VerifyUserParams,
    { prisma, pubSub }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    const verifiedUserId = await verifyUserService(prisma, params);

    if (typeof verifiedUserId === "string") {
      pubSub.publish("verifyUser", verifiedUserId, {
        mutation: "VERIFIED",
        userId: verifiedUserId,
      });
    }

    return verifiedUserId;
  },

  async login(
    _: unknown,
    { data }: { data: LoginInput },
    { prisma, res }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    return await loginService(prisma, data, res);
  },

  async logout(
    _: unknown,
    __: unknown,
    { user, req, res }: YogaContext,
    ___: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }
    return await logoutService(user, req, res);
  },

  async resetPassword(
    _: unknown,
    params: ResetPasswordInput,
    { prisma, user, req }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    return await resetPasswordService(
      prisma,
      user.id,
      params,
      req.headers.origin,
    );
  },

  async verifyResetPassword(
    _: unknown,
    params: VerifyCodeParams,
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    return await verifyResetPasswordService(prisma, user.id, params);
  },

  async uploadAvatar(
    _: unknown,
    params: ImageParams,
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    return await uploadAvatarService(prisma, user.id, params);
  },

  async updateName(
    _: unknown,
    params: UpdateNameParams,
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    return await updateNameService(prisma, user.id, params);
  },

  async updateAbout(
    _: unknown,
    params: UpdateAboutParams,
    { prisma, user }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }
    return await updateAboutService(prisma, user.id, params);
  },

  async followRequest(
    _: unknown,
    { toId }: { toId: string },
    { prisma, user, pubSub }: YogaContext,
    __: GraphQLResolveInfo,
  ) {
    if (user === null) {
      return new AuthenticationError(UN_AUTH_ERR_MSG);
    }

    if (user.id === toId) {
      return new ForbiddenError(FOLLOW_OWN_ERR_MSG);
    }

    const result = await followRequestService(prisma, toId, user.id);
    pubSub.publish("following", toId, {
      followedBy: user,
      mutation: EFollowingMutationStatus.Follow,
    });

    return result;
  },

  async unFollowRequest(
    _: unknown,
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
