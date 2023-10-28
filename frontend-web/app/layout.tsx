import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import localFont from "next/font/local";

import ThemeProvider from "@/components/providers/ThemeProvider";
import AuthProvider from "@/components/providers/context/authContext";
import { cn } from "@/lib/utils";

import { ApolloWrapper } from "../components/wrappers/ApolloWrapper";
import RouteChangeProgress from "../components/wrappers/RouteChangeProgress";
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
    <html lang="en" className={cn(body.variable, title.variable)}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <AuthProvider>
        <body className="bg-base-100 font-body">
          <ThemeProvider>
            <ApolloWrapper>{children}</ApolloWrapper>
            <RouteChangeProgress />
            <div id="tooltip" role="tooltip" aria-label="tooltip" />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
