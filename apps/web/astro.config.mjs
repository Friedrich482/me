// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import svgr from "vite-plugin-svgr";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://friedrichwt.dev",
  vite: {
    plugins: [
      // @ts-ignore
      tailwindcss(),
      // @ts-ignore
      svgr(),
      // @ts-ignore
      visualizer({
        open: true,
        filename: "dist/deps.html",
      }),
    ],
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks: {
            trpc: ["@trpc/client", "@trpc/server"],
            reactmarkdown: ["react-markdown"],
            remarkGfm: ["remark-gfm"],
            rehypeRaw: ["rehype-raw"],
          },
        },
      },
    },
  },

  integrations: [react(), sitemap()],
});
