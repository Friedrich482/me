import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    svgr(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
  },
  base: "/",
  build: {
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[\\/]react/,
            },
            {
              name: "zod-vendor",
              test: /node_modules[\\/]zod/,
            },
            {
              name: "react-markdown-vendor",
              test: /node_modules[\\/]react-markdown/,
            },
            {
              name: "remark-gfm-vendor",
              test: /node_modules[\\/]remark-gfm/,
            },
            {
              name: "rehype-raw-vendor",
              test: /node_modules[\\/]rehype-raw/,
            },
          ],
        },
      },
    },
  },
});
