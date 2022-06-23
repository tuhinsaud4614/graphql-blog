import { registerUserCtrl } from "../../controller/user.controller";
import { IRegisterUserInput } from "../../utils/interfaces";
import { YogaContextReturnType } from "../../utils/types";

export const Mutation = {
  async registerUser(
    _: any,
    { data }: { data: IRegisterUserInput },
    { prisma }: YogaContextReturnType,
    __: any
  ) {
    const result = await registerUserCtrl(prisma, data);
    return result;
  },
};
