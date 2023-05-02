/// <reference types="vite/client" />

import express from "express";
import bodyParser from "body-parser";
import { createExpressEndpoints } from "@ts-rest/express";
import { contract } from "./contract";
import { router } from "./app";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
});

export const app = express();
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

createExpressEndpoints(contract, router, app);

app.use(Sentry.Handlers.errorHandler());

if (import.meta.env.PROD) {
  const port = process.env.port || 3000;
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
  });
}
