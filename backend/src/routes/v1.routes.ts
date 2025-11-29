import { Router } from "express";

import userRouters from "@/resolvers/user/user.routes";

const v1Routes = Router();

v1Routes.use("/users", userRouters);

export default v1Routes;
