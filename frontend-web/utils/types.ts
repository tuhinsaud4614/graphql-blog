import { NextPage } from "next";
import { AppProps } from "next/app";
import * as React from "react";

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

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
