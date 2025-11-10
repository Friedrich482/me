import path from "path";
import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";
import svgr from "vite-plugin-svgr";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr(), commonjs()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
  },
  base: "/",
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          reactrouter: ["react-router"],
          zod: ["zod"],
          trpc: ["@trpc/client", "@trpc/server"],
          reacthookform: ["react-hook-form"],
          query: [
            "@tanstack/react-query",
            "@tanstack/query-core",
            "@tanstack/react-query-devtools",
          ],
          reactmarkdown: ["react-markdown"],
          remarkGfm: ["remark-gfm"],
          rehypeRaw: ["rehype-raw"],
        },
      },
    },
  },
});
