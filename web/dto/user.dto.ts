import z from "zod";
import { pictureSchema } from "./picture.dto";
import { Prettify } from "@/lib/types";

export const userAuthSchema = z.object({
    about: z.string().nullable().optional(),
    userStatus: z.enum(["PENDING", "VERIFIED"]).nullable().optional(),
    avatar: pictureSchema.optional().nullable().optional(),
    email: z.email(),
    exp: z.number(),
    iat: z.number(),
    id: z.string(),
    name: z.string().nullable().optional(),
    role: z.enum(["ADMIN", "AUTHOR"]),
});

export type IAuthUser = Prettify<z.infer<typeof userAuthSchema>>;

export const sessionSchema = z.object({
    accessToken: z.string().optional().nullable(),
    error: z.string().optional().nullable(),
    expires: z.string().optional().nullable(),
    user: userAuthSchema,
});

export type Session = Prettify<z.infer<typeof sessionSchema>>;

