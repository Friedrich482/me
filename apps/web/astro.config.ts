import { visualizer } from "rollup-plugin-visualizer";
import commonjs from "vite-plugin-commonjs";
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
      // @ts-ignore
      tailwindcss(),
      // @ts-ignore
      svgr(),
      // @ts-ignore
      visualizer({
        open: true,
        filename: "dist/deps.html",
      }),
      // @ts-ignore
      commonjs(),
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
