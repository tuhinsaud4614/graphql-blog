import z from "zod";

export const pictureSchema = z.object({
    id: z.string(),
    height: z.number(),
    width: z.number(),
    url: z.string().url(),
});

export type Picture = z.infer<typeof pictureSchema>;
