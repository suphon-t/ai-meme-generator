import express from "express";
import bodyParser from "body-parser";
import { contract } from "./contract";
import { initServer, createExpressEndpoints } from "@ts-rest/express";

import { createCanvas, loadImage, registerFont } from "canvas";
import { drawText } from "./drawText";
import { upload } from "./s3";
import { v4 as uuidv4 } from "uuid";

// https://code-boxx.com/nodejs-add-text-to-image/

const app = express();
// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const s = initServer();
registerFont("./src/font/impact.ttf", { family: "Impact" });

const router = s.router(contract, {
  index: async () => {
    return { status: 200, body: { result: "Hello world!" } };
  },
  captionImage: async ({ body }) => {
    try {
      const load_path = `./src/template/${body.template}.png`;
      const image = await loadImage(load_path);
      const canvas = createCanvas(image.width, image.height);
      const text0 = body.text0.toUpperCase();
      const text1 = body.text1.toUpperCase();
      drawText(image, canvas, text0, text1);

      const buffer = canvas.toBuffer("image/png");
      const uuid = uuidv4();
      const url = await upload(`${uuid}.png`, buffer);
      return {
        status: 201,
        body: { img: url },
      };
    } catch (e: unknown) {
      return { status: 400, body: { message: String(e) } };
    }
  },
});

createExpressEndpoints(contract, router, app);

if (import.meta.env.PROD) {
  const port = process.env.port || 3333;
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}/`);
  });
}

export const viteNodeApp = app;
