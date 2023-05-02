import express from "express";
import bodyParser from "body-parser";
import { contract } from "./contract";
import { initServer, createExpressEndpoints } from "@ts-rest/express";

import { createCanvas, loadImage, registerFont } from "canvas";
import { createCtx, drawText, writeCaption } from "./drawText";
import { upload } from "./s3";
import { v4 as uuidv4 } from "uuid";
import { BOX } from "./customBox";

import fs from "fs";
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
    const template = body.template;
    try {
      const load_path = `./src/template/${template}.png`;
      const image = await loadImage(load_path);
      const canvas = createCanvas(image.width, image.height);
      const text0 = body.text0?.toUpperCase();
      const text1 = body.text1?.toUpperCase();
      if (template in BOX) {
        const ctx = createCtx(image, canvas);
        // write text
        if (text0 && "text0" in BOX[template]) {
          drawText(ctx, text0, BOX[template]["text0"]!);
        }
        if (text1 && "text1" in BOX[template]) {
          drawText(ctx, text1, BOX[template]["text1"]!);
        }
      } else {
        // top text bottom text
        writeCaption(image, canvas, text0, text1);
      }

      if (process.env.NODE_ENV === "development") {
        const save_path = `./src/images/tmp.png`;
        const out = fs.createWriteStream(save_path);
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        return {
          status: 201,
          body: { img: `Saving to ${save_path}` },
        };
      }

      const buffer = canvas.toBuffer("image/png");
      const uuid = uuidv4();
      const key = `${uuid}.png`;
      await upload(key, buffer);
      return {
        status: 201,
        body: { img: key },
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
