import { z } from "zod";

export const pictureSchema = z.object({
  id: z.string(),
  height: z.number(),
  width: z.number(),
  url: z.string().url(),
});

export const userAuthSchema = z.object({
  about: z.string().nullable().optional(),
  userStatus: z.enum(["PENDING", "VERIFIED"]).nullable().optional(),
  avatar: pictureSchema.optional().nullable().optional(),
  email: z.string().email(),
  exp: z.number(),
  iat: z.number(),
  id: z.string(),
  name: z.string().nullable().optional(),
  role: z.enum(["ADMIN", "AUTHOR"]),
});
