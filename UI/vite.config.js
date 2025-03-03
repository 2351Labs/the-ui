import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    port: 5174,
  },
  optimizeDeps: {
    exclude: ["@react-oauth/google"],
  },
});
