/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          ...defaultTheme.fontFamily.sans,
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        primary: "#570DF8",
        "primary-focus": "#4506CB",
        secondary: "#F000B8",
        "secondary-focus": "#C20095",
        accent: "#37CDBE",
        "accent-focus": "#2AA79B",
        "accent-content": "#153734",
        neutral: "#3D4451",
        "neutral-focus": "#303640",
        "base-100": "#FFFFFF",
        "base-200": "#F2F2F2",
        "base-300": "#E5E6E6",
        "base-content": "#1F2937",
        info: "#3ABFF8",
        "info-content": "#002B3D",
        success: "#36D399",
        "success-focus": "#19c887",
        "success-content": "#003320",
        warning: "#FBBD23",
        "warning-content": "#382800",
        error: "#F87272",
        "error-focus": "#f83636",
        "error-content": "#470000",
      },
      screens: {
        md1: "901px",
      },
      animation: {
        toolBottomTip: "tooltipBottom .15s ease-out",
        toolTopTip: "tooltipTop .15s ease-out",
        tooltipArrow: "tooltipArrow .15s ease-out",
        tooltipBottomArrow: "tooltipBottomArrow .15s ease-out",
        tooltipTopArrow: "tooltipTopArrow .15s ease-out",
        "progress-bar": "progress-bar 2s linear infinite",
      },
      keyframes: {
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
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("tailwind-scrollbar-hide"),
  ],
};
