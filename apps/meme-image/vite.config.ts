import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ["canvas"],
    },
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./src/app.ts",
    }),
  ],
  server: {
    port: 3333,
  },
});
