import { visualizer } from "rollup-plugin-visualizer";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://friedrichwt.dev",
  vite: {
    plugins: [
      tailwindcss(),
      svgr(),
      visualizer({
        open: true,
        filename: "dist/deps.html",
      }),
    ],

    build: {
      chunkSizeWarningLimit: 800,
      rolldownOptions: {
        output: {
          codeSplitting: {
            maxSize: 800,
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
  },

  integrations: [react(), sitemap()],
});
