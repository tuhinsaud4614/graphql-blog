module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "import/extensions": "off",
    "import/no-unresolved": "error",
    "no-useless-constructor": "off",
    "no-empty-function": ["error", { allow: ["constructors"] }],
    "@typescript-eslint/no-empty-function": [
      "error",
      { allow: ["constructors"] },
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
    "import/parsers": { "@typescript-eslint/parser": [".ts"] },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
};
