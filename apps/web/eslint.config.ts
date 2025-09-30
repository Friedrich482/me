import eslintPluginAstro from "eslint-plugin-astro";

import commonLintConfig from "@repo/eslint-config/lint";

export default [
  ...commonLintConfig,
  {
    ignores: ["**/eslint.config.ts", "**/*.astro", "./dist/**"],
  },

  // Astro files configuration
  {
    files: ["**/*.astro"],
    plugins: {
      astro: eslintPluginAstro,
    },
    languageOptions: {
      parser: eslintPluginAstro,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      ...eslintPluginAstro.configs.recommended,
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
];
