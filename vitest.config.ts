import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    // Run component tests in a browser-like DOM environment.
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      // Mirror TS path aliases so imports work the same in tests.
      "@": fileURLToPath(new URL("./", import.meta.url)),
    },
  },
});
