import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import preset from "./preset";

const config: Config = {
  presets: [preset],
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "body": ["var(--font-body)", ...fontFamily.sans],
        "title": ["var(--font-title)", ...fontFamily.serif],
      },
    },
  },
};
export default config;
