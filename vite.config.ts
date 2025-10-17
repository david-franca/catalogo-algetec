/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";

import { Schema, ValidateEnv } from "@julr/vite-plugin-validate-env";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    ValidateEnv({
      VITE_API_URL: Schema.string(),
    }),
    tsconfigPaths(),
  ],
  build: {
    assetsDir: "assets",
    manifest: true,
    outDir: "dist",
    sourcemap: false,
    assetsInlineLimit: 0,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    globals: true,
    watch: false,
    include: ["src/tests/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".mjs", ".cjs"],
  },
});
