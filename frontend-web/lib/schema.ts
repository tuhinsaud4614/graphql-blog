import { z } from "zod";

export const pictureSchema = z.object({
  id: z.string(),
  height: z.number(),
  width: z.number(),
  url: z.string().url(),
});

export const userSchema = z.object({
  about: z.string().nullable(),
  authorStatus: z.enum(["PENDING", "VERIFIED"]).nullable(),
  avatar: pictureSchema.nullable(),
  email: z.string().email(),
  exp: z.number(),
  iat: z.number(),
  id: z.string(),
  mobile: z.string(),
  name: z.string().nullable(),
  role: z.enum(["ADMIN", "AUTHOR"]),
});
