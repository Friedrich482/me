import commonLintConfig from "@repo/eslint-config/lint";

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
];
