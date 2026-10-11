import adapter from "@sveltejs/adapter-static";
import { enhancedImages } from "@sveltejs/enhanced-img";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit({ preprocess: vitePreprocess(), adapter: adapter() }),
  ],
});
