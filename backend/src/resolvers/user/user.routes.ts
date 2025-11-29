import { Router } from "express";

import {
  authenticateGoogleOAuth2,
  authenticateGoogleOauth2Callback,
} from "@/middleware/passport-authenticate";

const userRouters = Router();

userRouters.get("/google/login", authenticateGoogleOAuth2);
userRouters.get("/google/callback", authenticateGoogleOauth2Callback);

export default userRouters;
