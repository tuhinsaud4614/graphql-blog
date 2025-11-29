import { Router } from "express";

import v1Routes from "./v1.routes";

const routes = Router();

routes.use("/v1", v1Routes);

export default routes;
