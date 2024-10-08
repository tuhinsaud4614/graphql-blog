/* eslint-disable @typescript-eslint/no-require-imports */
import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const myPlugin = plugin(
  // Add Css variable definitions to the base layer
  ({ addBase }) => {
    addBase({
      ":root": {
        "--background": "0 0% 100%",
        "--foreground": "219.23 20.31% 25.10%",
        "--muted": "220 14.3% 95.9%",
        "--muted-foreground": "220 8.9% 46.1%",
        "--popover": "0 0% 100%",
        "--popover-foreground": "224 71.4% 4.1%",
        "--primary": "258.89 94.38% 51.18%",
        "--primary-foreground": "210 20% 98%",
        "--primary-focus": "258.89 94.38% 51.18% / 0.9",
        "--primary-content": "258.9 87.72% 55.29%",
        "--primary-disabled": "259.19 94.26% 40.98% / 34.9%",
        "--secondary": "314 100% 47.06%",
        "--secondary-foreground": "0 0% 100%",
        "--secondary-focus": "314 100% 47.06% / 0.9",
        "--secondary-content": "314 84% 52%",
        "--secondary-disabled": "314 100% 47.06% / 34.9%",
        "--accent": "118.42 71.25% 31.37%",
        "--accent-focus": "118.02 71.65% 24.9%",
        "--accent-content": "118.68 39.74% 44.9%",
        "--accent-disabled": "118.42 71.25% 31.37% / 30%",
        "--neutral": "219.23 20.31% 25.10%",
        "--neutral-focus": "220 13.04% 90.98%",
        "--base-100": "0 0% 100%",
        "--base-200": "217.50 44.44% 96.47%",
        "--base-300": "180 1.96% 90%",
        "--base-content": "215 27.91% 16.86%",
        "--info": "209.84 78.72% 46.08%",
        "--info-focus": "209.84 78.72% 46.08% / 0.9",
        "--info-content": "206.57 89.74% 54.12%",
        "--info-disabled": "205.38 86.67% 94.12%",
        "--success": "122.79 43.43% 38.82%",
        "--success-foreground": "0 0% 100%",
        "--success-focus": "122.79 43.43% 38.82% / 0.9",
        "--success-content": "122.42 39.44% 49.22%",
        "--success-disabled": "124.62 39.39% 93.53%",
        "--warning": "30.37 100% 48.04%",
        "--warning-foreground": "0 0% 0% / 87%",
        "--warning-focus": "30.37 100% 48.04% / 0.9",
        "--warning-content": "35.76 100% 50%",
        "--warning-disabled": "36.77 100% 93.92%",
        "--error": "0 65.08% 50.59%",
        "--error-foreground": "0 0% 100%",
        "--error-focus": "0 65.08% 50.59% / 0.9",
        "--error-content": "4.11 89.62% 58.43%",
        "--error-disabled": "351 100% 96.08%",
        "--border": "220 13% 91%"
      },
      ".dark": {
        "--background": "20 14.29% 4.12%",
        "--foreground": "0 0% 100%",
        "--muted": "215 27.9% 16.9%",
        "--muted-foreground": "217.9 10.6% 64.9%",
        "--popover": "224 71.4% 4.1%",
        "--popover-foreground": "210 20% 98%",
        "--primary": "264.13 100% 63.92%",
        "--primary-foreground": "210 20% 98%",
        "--primary-focus": "263.94 80.34% 54.12%",
        "--primary-content": "264.32 100% 70.98%",
        "--primary-disabled": "264.13 100% 63.92% / 30%",
        "--secondary": "314.06 88.89% 57.65%",
        "--secondary-foreground": "0 0% 100%",
        "--secondary-focus": "313.92 100% 38.04%",
        "--secondary-content": "314.03 88.51% 65.88%",
        "--secondary-disabled": "314 100% 47.06% / 34.9%",
        "--accent": "141.22 50.00% 67.84%",
        "--accent-focus": "140.98 50.20% 48.04%",
        "--accent-content": "140.91 50% 74.12%",
        "--accent-disabled": "141.18 50% 60% / 50.2%",
        "--neutral": "0 0% 100%",
        "--neutral-focus": "0 0% 61.96%",
        "--base-100": "20 14.29% 4.12%",
        "--base-200": "240 5.88% 10%",
        "--base-300": "240 5.15% 19.02%",
        "--base-content": "215 27.91% 16.86%",
        "--info": "206.82 89.95% 60.98%",
        "--info-focus": "211.93 80.28% 41.76%",
        "--info-content": "206.57 89.74% 54.12%",
        "--info-disabled": "205.38 86.67% 94.12%",
        "--success": "122.82 38.46% 56.67%",
        "--success-foreground": "0 0% 0% / 87%",
        "--success-focus": "123.04 46.20% 33.53%",
        "--success-content": "122.42 39.44% 49.22%",
        "--success-disabled": "124.62 39.39% 93.53%",
        "--warning": "35.67 100% 57.45%",
        "--warning-foreground": "0 0% 0% / 87%",
        "--warning-focus": "27.11 100% 46.86%",
        "--warning-content": "35.76 100% 50%",
        "--warning-disabled": "36.77 100% 93.92%",
        "--error": "1.13 83.25% 62.55%",
        "--error-foreground": "0 0% 100%",
        "--error-focus": "0 66.39% 46.67%",
        "--error-content": "4.11 89.62% 58.43%",
        "--error-disabled": "351 100% 96.08%",
        "--border": "215 27.9% 16.9%"
      },
    });
  },
  // Extend Tailwind theme
  {
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
        transitionTimingFunction: {
          custom: "cubic-bezier(0.3, 0, 0.5, 1)",
          icon: "cubic-bezier(0.2, 0, 0.13, 2)",
        },
        boxShadow: {
          mine: "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
          top: "0 0 10px rgb(0 0 0 / 10%), 0 0 10px rgb(0 0 0 / 10%)",
          mui: "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px",
          "mui-hover":
            "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px",
          "mui-active":
            "rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px",
        },
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          muted: {
            DEFAULT: "hsl(var(--muted))",
            foreground: "hsl(var(--muted-foreground))",
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
            focus: "hsl(var(--primary-focus))",
            content: "hsl(var(--primary-content))",
            disabled: "hsl(var(--primary-disabled))",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
            focus: "hsl(var(--secondary-focus))",
            content: "hsl(var(--secondary-content))",
            disabled: "hsl(var(--secondary-disabled))",
          },
          accent: {
            DEFAULT: "hsl(var(--accent))",
            focus: "hsl(var(--accent-focus))",
            content: "hsl(var(--accent-content))",
            disabled: "hsl(var(--accent-disabled))",
          },
          info: {
            DEFAULT: "hsl(var(--info))",
            focus: "hsl(var(--info-focus))",
            content: "hsl(var(--info-content))",
            disabled: "hsl(var(--info-disabled))",
          },
          success: {
            DEFAULT: "hsl(var(--success))",
            foreground: "hsl(var(--success-foreground))",
            focus: "hsl(var(--success-focus))",
            content: "hsl(var(--success-content))",
            disabled: "hsl(var(--success-disabled))",
          },
          warning: {
            DEFAULT: "hsl(var(--warning))",
            foreground: "hsl(var(--warning-foreground))",
            focus: "hsl(var(--warning-focus))",
            content: "hsl(var(--warning-content))",
            disabled: "hsl(var(--warning-disabled))",
          },
          error: {
            DEFAULT: "hsl(var(--error))",
            foreground: "hsl(var(--error-foreground))",
            focus: "hsl(var(--error-focus))",
            content: "hsl(var(--error-content))",
            disabled: "hsl(var(--error-disabled))",
          },
          neutral: {
            DEFAULT: "hsl(var(--neutral))",
            focus: "hsl(var(--neutral-focus))",
          },
          base: {
            100: "hsl(var(--base-100))",
            200: "hsl(var(--base-200))",
            300: "hsl(var(--base-300))",
            content: "hsl(var(--base-content))",
          },
        },
        screens: {
          md1: "901px",
          lg1: "1280px",
        },
        animation: {
          toolBottomTip: "tooltipBottom .15s ease-out",
          toolTopTip: "tooltipTop .15s ease-out",
          tooltipArrow: "tooltipArrow .15s ease-out",
          tooltipBottomArrow: "tooltipBottomArrow .15s ease-out",
          tooltipTopArrow: "tooltipTopArrow .15s ease-out",
          "progress-bar": "progress-bar 2s linear infinite",
          "check-mark": "check-mark 0.2s ease-in-out",
        },
        keyframes: {
          "check-mark": {
            "0%": {
              "background-position-y": "5px",
            },
            "50%": {
              "background-position-y": "-2px",
            },
            "100%": {
              "background-position-y": "0",
            },
          },
          "progress-bar": {
            "0%": {
              "background-position": "100%",
            },
            "100%": {
              "background-position": "0%",
            },
          },
          tooltipTop: {
            "0%": {
              opacity: "0",
              transform: "scale(0) translateY(100%)",
            },
            "100%": {
              opacity: "1",
              transform: "scale(1) translateY(0)",
            },
          },
          tooltipBottom: {
            "0%": {
              opacity: "0",
              transform: "scale(0) translateY(-100%)",
            },
            "100%": {
              opacity: "1",
              transform: "scale(1) translateY(0)",
            },
          },
          tooltipBottomArrow: {
            "0%": {
              opacity: "0",
              transform: "scale(0) rotate(45deg) translateY(-100%)",
            },
            "100%": {
              opacity: "1",
              transform: "scale(1) rotate(45deg) translateY(0)",
            },
          },
          tooltipTopArrow: {
            "0%": {
              opacity: "0",
              transform: "scale(0) rotate(45deg) translateY(100%)",
            },
            "100%": {
              opacity: "1",
              transform: "scale(1) rotate(45deg) translateY(0)",
            },
          },
        },
        backgroundImage: ({ theme }) => ({
          "check-primary": `linear-gradient(-45deg, transparent 65%, ${theme(
            "colors.primary",
          )} 65.99%), linear-gradient(45deg, transparent 75%, ${theme(
            "colors.primary",
          )} 75.99%), linear-gradient(-45deg, ${theme(
            "colors.primary",
          )} 40%, transparent 40.99%), linear-gradient(45deg, ${theme(
            "colors.primary",
          )} 30%, ${theme("colors.base-100")} 30.99%, ${theme(
            "colors.base-100",
          )} 40%, transparent 40.99%), linear-gradient(-45deg, ${theme(
            "colors.base-100",
          )} 50%, ${theme("colors.primary")} 50.99%)`,
          progress:
            "linear-gradient(90deg, #ffd33d, #ea4aaa 17%, #b34bff 34%, #01feff 51%, #ffd33d 68%, #ea4aaa 85%, #b34bff)",
          "base-left": `linear-gradient(90deg, rgba(255, 255, 255, 0) 0px, ${theme(
            "colors.base-100",
          )} 50%)`,
          "base-right": `linear-gradient(270deg, rgba(255, 255, 255, 0) 0px, ${theme(
            "colors.base-100",
          )} 50%)`,
          "base-top": `linear-gradient(
              ${theme("colors.base-100")} 0%,
              ${theme("colors.base-100")} 5%,
              rgba(255, 255, 255, 0.6) 5%,
              ${theme("colors.base-100")} 65%
            )`,
          scrollbar: `linear-gradient(180deg, transparent, ${theme(
            "colors.accent",
          )})`,
        }),
      },
    },
  },
);

const preset = {
  darkMode: ["class"],
  content: [],
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar-hide"),
    myPlugin,
  ],
} satisfies Config;

export default preset;
