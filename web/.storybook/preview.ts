import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview, ReactRenderer } from "@storybook/nextjs-vite";

import "../app/globals.css";

const preview: Preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    darkMode: {
      classTarget: "html",
      darkClass: "dark",
      lightClass: "light",
    },
  },

  globalTypes: {
    // schema: {
    //   name: "Theme",
    //   description: "Global theme for components",
    //   default: "light",
    //   toolbar: {
    //     icon: "circlehollow",
    //     items: [
    //       { value: "light", title: "Light", left: "sun" },
    //       { value: "dark", title: "Dark", left: "moon" },
    //     ],
    //   },
    // },
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: "light",
        dark: "dark",
        system: "system",
      },
      defaultTheme: "light",
      parentSelector: "html",
    }),
  ],
};

export default preview;
