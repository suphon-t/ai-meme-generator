/// <reference types="vite/client" />

import express from "express";
import bodyParser from "body-parser";
import { createExpressEndpoints } from "@ts-rest/express";
import { contract } from "./contract";
import { router } from "./app";

export const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

createExpressEndpoints(contract, router, app);

if (import.meta.env.PROD) {
  const port = process.env.port || 3000;
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
  });
}
