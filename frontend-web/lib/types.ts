import { z } from "zod";

import { pictureSchema, userSchema } from "./schema";

export interface IAnchorOrigin {
  horizontal?: "center" | "right" | "left";
  vertical?: "bottom" | "top";
}

export type ColorVariantType =
  | "primary"
  | "secondary"
  | "accent"
  | "error"
  | "success"
  | "warning"
  | "info"
  | "neutral";

export type ButtonModeType = "outline" | "fill" | "text";

export type IPicture = z.infer<typeof pictureSchema>;
export type IUser = z.infer<typeof userSchema>;
