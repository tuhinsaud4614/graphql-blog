import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";

import { Toaster } from "sonner";

import RouteChangeProgress from "@/components/RouteChangeProgress";
import Providers from "@/components/providers";
import { isDev } from "@/lib/isType";
import { cn } from "@/lib/utils";

import "./globals.css";

const title = Raleway({
  display: "swap",
  variable: "--font-title",
  subsets: ["latin"],
});

const body = localFont({
  src: [
    {
      path: "./fonts/Matter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Matter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "The RAT Diary",
  description:
    "The RAT Diary is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic.",
  creator: "Rayhan Ahmed Tuhin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(body.variable, title.variable)}
      suppressHydrationWarning={isDev()}
    >
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body
        className="bg-base-100 font-body"
        suppressHydrationWarning={isDev()}
      >
        <Providers>{children}</Providers>
        <RouteChangeProgress />
        <Toaster richColors />
      </body>
    </html>
  );
}
