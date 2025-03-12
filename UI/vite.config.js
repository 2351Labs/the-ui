import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import fs from "fs";
import path from "path";

export default defineConfig({
  plugins: [
    svgr(),
    react(),
    {
      //for netlify routing to work with react router
      name: "generate-redirects",
      closeBundle() {
        // Ensures this runs after the build process
        const redirectsContent = "/*    /index.html   200\n";
        const redirectsPath = path.resolve("dist/_redirects");

        fs.writeFileSync(redirectsPath, redirectsContent);
        console.log("✅ _redirects file created in dist/");
      },
    },
    {
      //Change url to be for deployed backend url on build
      name: "replace-config",
      closeBundle() {
        // Runs after the build is complete
        const configPath = path.resolve("dist/config.js");

        // Define new environment variables
        const newConfig = {
          VITE_API_URL: "https://the-api-yuq4.onrender.com",
        };

        // Overwrite `config.js` completely
        fs.writeFileSync(
          configPath,
          `window.env = ${JSON.stringify(newConfig, null, 2)};`
        );
        console.log(
          "✅ Replaced public/config.js with new environment variables"
        );
      },
    },
  ],
  server: {
    port: 5174,
  },
  optimizeDeps: {
    exclude: ["@react-oauth/google"],
  },
});
