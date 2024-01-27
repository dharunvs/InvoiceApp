import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2015", // Specify the target environment
    polyfillDynamicImport: false, // Disable dynamic import polyfill
  },
});
