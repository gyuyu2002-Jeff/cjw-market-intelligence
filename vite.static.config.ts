import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Use relative paths so it loads correctly on GitHub Pages
  build: {
    outDir: "docs", // Output directly to the GitHub Pages folder
    emptyOutDir: true, // Clean docs/ before building
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
});
