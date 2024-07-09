import { defineConfig } from "@vscode/test-cli";

export default defineConfig({
  files: "out/test/**/*.test.js",
  mocha: {
    reporterOptions: {
      maxDiffSize: 0,
    },
  },
});
