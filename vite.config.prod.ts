/*
 * @Author: Phoenix Fan
 * @Date: 2022-09-05 12:17:00
 * @LastEditors: Phoenix Fan
 * @LastEditTime: 2022-09-05 12:39:39
 * @Description:
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  ssr: {
    target: "node",
  },
  build: {
    ssr: path.resolve(__dirname, "src/entry-server.ts"),
    outDir: path.resolve(__dirname, "dist/server"),
    lib: {
      entry: path.resolve(__dirname, "src/entry-server.ts"),
      formats: ["cjs"],
      name: "a.js",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".js", ".vue"],
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/index.scss";',
      },
    },
  },
});
