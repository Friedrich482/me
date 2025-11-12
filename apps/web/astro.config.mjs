// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
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
      {
        name: "manual-chunks",
        enforce: "post",
        config(config, { command }) {
          if (command === "build") {
            config.build = config.build || {};
            config.build.rollupOptions = config.build.rollupOptions || {};
            config.build.rollupOptions.output = {
              ...config.build.rollupOptions.output,
              manualChunks(id) {
                if (id.includes("react-markdown")) return "markdown-vendor";
                if (id.includes("remark-gfm")) return "remark-vendor";
                if (id.includes("rehype-raw")) return "rehype-vendor";
              },
            };
          }
        },
      },
    ],
  },

  integrations: [react(), sitemap()],
});
