import type { Metadata } from "next";
import { Playfair_Display, Roboto } from "next/font/google";

import ThemeProvider from "@/components/providers/ThemeProvider";
import AuthProvider from "@/components/providers/context/authContext";
import { cn } from "@/lib/utils";

import { ApolloWrapper } from "../components/wrappers/ApolloWrapper";
import RouteChangeProgress from "../components/wrappers/RouteChangeProgress";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  display: "swap",
  variable: "--font-title",
  subsets: ["latin"],
});

const roboto = Roboto({
  display: "swap",
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["100" , "300" , "400" , "500" , "700" , "900" ,]
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
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </head>
      <AuthProvider>
        <body
          className={cn(
            "bg-base-100 font-body",
            roboto.variable,
            playfairDisplay.variable,
          )}
        >
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
