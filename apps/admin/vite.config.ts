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
});
