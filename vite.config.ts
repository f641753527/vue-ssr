import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// import AutoImport from "unplugin-auto-import/vite";
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".ts", ".js", ".vue"],
  },
  plugins: [
    vue(),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/index.scss";',
      },
    },
  },
  server: {
    port: 8080,
    proxy: {
      "/api": {
        target:
          "https://mock.mengxuegu.com/mock/6346372dba6bdb4f54a85f7e/airbnb",
        changeOrigin: true,
      },
    },
  },
});
