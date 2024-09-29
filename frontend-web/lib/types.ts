import React from "react";

import { z } from "zod";

import { pictureSchema, userAuthSchema } from "./schema";

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
export type IAuthUser = z.infer<typeof userAuthSchema>;

// Component Props
export type AsProps<T extends React.ElementType> = { as?: T };

export type PropsToOmit<T extends React.ElementType, P> = keyof (AsProps<T> &
  P);

export type PolymorphicProps<
  T extends React.ElementType,
  Props = object,
> = React.PropsWithChildren<Props & AsProps<T>> &
  Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>["ref"];

export type PolymorphicPropsWithRef<
  T extends React.ElementType,
  Props = object,
> = PolymorphicProps<T, Props> & { ref?: PolymorphicRef<T> };
