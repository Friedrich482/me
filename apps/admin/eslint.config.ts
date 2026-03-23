import commonLintConfig from "@repo/eslint-config/lint";
import pluginImports from "eslint-plugin-import";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  ...commonLintConfig,
  {
    ignores: ["**/eslint.config.ts", "./dist/**"],
  },

  {
    files: ["./src/App.tsx"],
    rules: {
      "check-file/filename-naming-convention": "off",
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
              target: "./src/features/auth",
              from: "./src/features",
              except: ["./auth"],
            },
            {
              target: "./src/features/create-post",
              from: "./src/features",
              except: ["./create-post"],
            },
            {
              target: "./src/features/edit-post",
              from: "./src/features",
              except: ["./edit-post"],
            },
            {
              target: "./src/features/post",
              from: "./src/features",
              except: ["./post"],
            },
            {
              target: "./src/features/posts",
              from: "./src/features",
              except: ["./posts"],
            },

            // app can import from features but not the other way around
            {
              target: "./src/features",
              from: "./src/app",
            },

            // features and app can import from all the folders below: components, hooks and utils but not the other way around
            {
              target: ["./src/components", "./src/hooks", "./src/utils"],
              from: ["./src/features", "./src/app"],
            },
          ],
        },
      ],
    },
  },
];
