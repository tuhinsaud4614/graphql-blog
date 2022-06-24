import {
  loginCtrl,
  registerCtrl,
  tokenCtrl,
} from "../../controller/user.controller";
import { ILoginInput, IRegisterInput } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Mutation = {
  async register(
    _: any,
    { data }: { data: IRegisterInput },
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    const result = await registerCtrl(prisma, data);
    return result;
  },

  async login(
    _: any,
    { data }: { data: ILoginInput },
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    const result = await loginCtrl(prisma, data);
    return result;
  },

  async token(
    _: any,
    { refreshToken }: { refreshToken: string },
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    const result = await tokenCtrl(prisma, refreshToken);
    return result;
  },
};
