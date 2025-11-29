/* eslint-disable @typescript-eslint/no-require-imports */
const { defineConfig } = require("eslint/config");

const globals = require("globals");

const { fixupConfigRules, fixupPluginRules } = require("@eslint/compat");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const prettier = require("eslint-plugin-prettier");
const _import = require("eslint-plugin-import");
const js = require("@eslint/js");

const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {},
    },

    extends: fixupConfigRules(
      compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
      ),
    ),

    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      prettier,
      import: fixupPluginRules(_import),
    },

    rules: {
      "prettier/prettier": "error",
      "import/extensions": "off",
      "import/no-unresolved": "error",
      "no-useless-constructor": "off",

      "no-empty-function": [
        "error",
        {
          allow: ["constructors"],
        },
      ],

      "@typescript-eslint/no-empty-function": [
        "error",
        {
          allow: ["constructors"],
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },

    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts"],
      },

      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },
]);
