import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ThemeProvider from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

import { ApolloWrapper } from "../components/wrappers/ApolloWrapper";
import RouteChangeProgress from "../components/wrappers/RouteChangeProgress";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <body className={cn(inter.className, "bg-base-100")}>
        <ThemeProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
          <RouteChangeProgress />
          <div id="presentational" role="presentation" />
          <div id="tooltip" role="tooltip" aria-label="tooltip" />
        </ThemeProvider>
      </body>
    </html>
  );
}
