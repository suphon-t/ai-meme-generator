import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    target: "es2022",
  },
  plugins: [
    ...VitePluginNode({
      adapter: "fastify",
      appPath: "./src/index.ts",
      exportName: "server",
      tsCompiler: "esbuild",
      swcOptions: {},
    }),
  ],
  optimizeDeps: {
    // Vite does not work well with optionnal dependencies,
    // you can mark them as ignored for now
    // eg: for nestjs, exlude these optional dependencies:
    // exclude: [
    //   '@nestjs/microservices',
    //   '@nestjs/websockets',
    //   'cache-manager',
    //   'class-transformer',
    //   'class-validator',
    //   'fastify-swagger',
    // ],
  },
});
