import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import tailwindcss from "eslint-plugin-tailwindcss";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  ...tseslint.configs.recommendedTypeChecked,
  ...tailwindcss.configs["flat/recommended"],
  prettier,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "cva"],
        classRegex: "^(class(Name)?|tw)$",
      },
      next: {
        rootDir: true,
      },
    },
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "react/jsx-key": "off",
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/classnames-order": "error",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-misused-promises": [
        2,
        {
          checksVoidReturn: { attributes: false },
        },
      ],
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
    },
  },
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "postcss.config.mjs",
    ],
  },
]);
