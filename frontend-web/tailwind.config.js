const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        mine: "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
        top: "0 0 10px rgb(0 0 0 / 10%), 0 0 10px rgb(0 0 0 / 10%)",
        mui: "rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px",
        "mui-hover":
          "rgb(0 0 0 / 20%) 0px 2px 4px -1px, rgb(0 0 0 / 14%) 0px 4px 5px 0px, rgb(0 0 0 / 12%) 0px 1px 10px 0px",
        "mui-active":
          "rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px",
      },
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
        "primary-dark": "#783df9",
        "primary-focus": "#4506CB",
        "primary-content": "#6829f1",
        "primary-disabled": "#4506cb59",
        secondary: "#F000B8",
        "secondary-dark": "#f333c6",
        "secondary-focus": "#C20095",
        "secondary-content": "#ec1ebc",
        "secondary-disabled": "#f000b859",
        accent: "#66cc8a",
        "accent-dark": "#84d6a1",
        "accent-focus": "#3db868",
        "accent-content": "#9cdeb3",
        "accent-disabled": "#66cc8a80",
        neutral: "#333c4d",
        "neutral-dark": "#f3f6f9",
        "neutral-focus": "#303640",
        "neutral-dark-focus": "#ffffff",
        "base-100": "#FFFFFF",
        "base-dark-100": "#0C0A09",
        "base-200": "#F2F5FA",
        "base-dark-200": "#1B1917",
        "base-300": "#E5E6E6",
        "base-dark-300": "#5090d3",
        "base-content": "#1F2937",
        info: "#1976d2",
        "info-dark": "#42a5f5",
        "info-focus": "#1565c0",
        "info-content": "#2196f3",
        "info-disabled": "#e3f2fd",
        success: "#388e3c",
        "success-dark": "#66bb6a",
        "success-focus": "#2e7d32",
        "success-content": "#4caf50",
        "success-disabled": "#e8f5e9",
        warning: "#f57c00",
        "warning-dark": "#ffa726",
        "warning-focus": "#ef6c00",
        "warning-content": "#ff9800",
        "warning-disabled": "#fff3e0",
        error: "#d32f2f",
        "error-dark": "#ef5350",
        "error-focus": "#c62828",
        "error-content": "#f44336",
        "error-disabled": "#ffebee",
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
          "colors.primary"
        )} 65.99%), linear-gradient(45deg, transparent 75%, ${theme(
          "colors.primary"
        )} 75.99%), linear-gradient(-45deg, ${theme(
          "colors.primary"
        )} 40%, transparent 40.99%), linear-gradient(45deg, ${theme(
          "colors.primary"
        )} 30%, ${theme("colors.base-100")} 30.99%, ${theme(
          "colors.base-100"
        )} 40%, transparent 40.99%), linear-gradient(-45deg, ${theme(
          "colors.base-100"
        )} 50%, ${theme("colors.primary")} 50.99%)`,
        progress:
          "linear-gradient(90deg, #ffd33d, #ea4aaa 17%, #b34bff 34%, #01feff 51%, #ffd33d 68%, #ea4aaa 85%, #b34bff)",
        "base-left": `linear-gradient(90deg, rgba(255, 255, 255, 0) 0px, ${theme(
          "colors.base-100"
        )} 50%)`,
        "base-dark-left": `linear-gradient(90deg, rgba(255, 255, 255, 0) 0px, ${theme(
          "colors.base-dark-100"
        )} 50%)`,
        "base-right": `linear-gradient(270deg, rgba(255, 255, 255, 0) 0px, ${theme(
          "colors.base-100"
        )} 50%)`,
        "base-dark-right": `linear-gradient(270deg, rgba(255, 255, 255, 0) 0px, ${theme(
          "colors.base-dark-100"
        )} 50%)`,
        "base-top": `linear-gradient(
            ${theme("colors.base-100")} 0%,
            ${theme("colors.base-100")} 5%,
            rgba(255, 255, 255, 0.6) 5%,
            ${theme("colors.base-100")} 65%
          )`,
        "base-dark-top": `linear-gradient(
            ${theme("colors.base-dark-100")} 0%,
            ${theme("colors.base-dark-100")} 5%,
            rgba(10, 25, 41, 0.6) 5%,
            ${theme("colors.base-dark-100")} 65%
          )`,
        scrollbar: `linear-gradient(180deg, transparent, ${theme(
          "colors.accent"
        )})`,
        "scrollbar-dark": `linear-gradient(180deg, transparent, ${theme(
          "colors.accent-dark"
        )})`,
      }),
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
  ],
};
