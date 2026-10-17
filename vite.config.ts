import adapter from "@sveltejs/adapter-static";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { sveltekit } from "@sveltejs/kit/vite";
import { execSync } from "node:child_process";
import { defineConfig } from "vite";

const commit = (() => {
  try {
    return execSync("git rev-parse --short HEAD", { encoding: "utf8" }).trim();
  } catch {
    return "dev";
  }
})();

export default defineConfig({
  define: {
    __COMMIT__: JSON.stringify(commit),
  },
  plugins: [
    enhancedImages(),
    sveltekit({ preprocess: vitePreprocess(), adapter: adapter() }),
  ],
});
