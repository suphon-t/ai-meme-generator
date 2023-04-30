import fastify from "fastify";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter } from "./app";

export const server = fastify({
  maxParamLength: 5000,
});

server.get("/", async (_, reply) => {
  reply.send("Hello World!");
});
server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
  },
});

if (import.meta.env.PROD) {
  try {
    console.log("Starting server on port 3000...");
    await server.listen({ host: "0.0.0.0", port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

export type AppRouter = typeof appRouter;
