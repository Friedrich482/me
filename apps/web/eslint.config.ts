import eslintPluginAstro from "eslint-plugin-astro";
import pluginImports from "eslint-plugin-import";
import path from "node:path";
import { fileURLToPath } from "node:url";

import commonLintConfig from "@repo/eslint-config/lint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  ...commonLintConfig,
  {
    ignores: ["**/eslint.config.ts", "**/*.astro", "./dist/**"],
  },
  {
    files: ["**/og/*.png.ts", "**/*.png.ts"],
    rules: {
      "check-file/filename-naming-convention": "off",
    },
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

  {
    plugins: {
      import: pluginImports,
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      "import/no-restricted-paths": [
        "error",
        {
          basePath: __dirname,
          zones: [
            // no cross-features imports
            {
              target: "./src/features/home",
              from: "./src/features",
              except: ["./home"],
            },
            {
              target: "./src/features/open-graph",
              from: "./src/features",
              except: ["./open-graph"],
            },
            {
              target: "./src/features/portfolio",
              from: "./src/features",
              except: ["./portfolio"],
            },
            {
              target: "./src/features/post",
              from: "./src/features",
              except: ["./post"],
            },

            // pages can import from features but not the other way around
            {
              target: "./src/features",
              from: "./src/pages",
            },

            // features and pages can import from all the folders below: components, hooks, utils and stores but not the other way around
            {
              target: [
                "./src/components",
                "./src/hooks",
                "./src/utils",
                "./src/stores",
              ],
              from: ["./src/features", "./src/pages"],
            },
          ],
        },
      ],
    },
  },
];
