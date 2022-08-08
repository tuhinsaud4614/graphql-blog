import { GetServerSidePropsContext, NextPage } from "next";
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

// Component Props
export type AsProps<T extends React.ElementType> = { as?: T };

export type PropsToOmit<T extends React.ElementType, P> = keyof (AsProps<T> &
  P);

export type PolymorphicProps<
  T extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProps<T>> &
  Omit<React.ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

export type PolymorphicRef<T extends React.ElementType> =
  React.ComponentPropsWithRef<T>["ref"];

export type PolymorphicPropsWithRef<
  T extends React.ElementType,
  Props = {}
> = PolymorphicProps<T, Props> & { ref?: PolymorphicRef<T> };

export type Value<T> = T | null;

export type SSRRequestType = Pick<GetServerSidePropsContext, "req">["req"];
export type SSRResponseType = Pick<GetServerSidePropsContext, "res">["res"];
