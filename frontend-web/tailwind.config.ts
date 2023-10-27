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
        "nunito-sans": ["var(--font-nunito-sans)", ...fontFamily.sans],
        "quick-sand": ["var(--font-quick-sand)", ...fontFamily.sans],
      },
    },
  },
};
export default config;
