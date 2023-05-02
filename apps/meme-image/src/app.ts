import express from "express";
import bodyParser from "body-parser";
import { contract } from "./contract";
import { initServer, createExpressEndpoints } from "@ts-rest/express";

import { createCanvas, loadImage, registerFont } from "canvas";
import { createCtx, drawText, writeCaption } from "./drawText";
import { upload } from "./s3";
import { v4 as uuidv4 } from "uuid";
import { BOX } from "./customBox";

import download from "image-downloader";

import { image_search } from "duckduckgo-images-api";

import fs from "fs";
// import google from "googlethis";

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
  captionTemplate: async ({ body }) => {
    const template = body.template;
    const text0 = body.text0?.toUpperCase();
    const text1 = body.text1?.toUpperCase();
    try {
      const loadPath = `./src/template/${template}.png`;
      const image = await loadImage(loadPath);
      const canvas = createCanvas(image.width, image.height);
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

      // if (process.env.NODE_ENV === "development") {
      //   const save_path = `./src/images/tmp.png`;
      //   const out = fs.createWriteStream(save_path);
      //   const stream = canvas.createPNGStream();
      //   stream.pipe(out);
      //   return {
      //     status: 201,
      //     body: { img: `Saving to ${save_path}` },
      //   };
      // }

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
  genericMemes: async ({ body }) => {
    const picture = body.picture;
    const text0 = body.text0?.toUpperCase();
    const text1 = body.text1?.toUpperCase();
    try {
      const filenames = await searchImages(picture);
      await Promise.all(
        filenames.map(async (filename) => {
          const path = `./src/images/${filename}`;
          const image = await loadImage(path);
          const canvas = createCanvas(image.width, image.height);
          writeCaption(image, canvas, text0, text1);

          const out = fs.createWriteStream(path);
          const stream = canvas.createPNGStream();
          stream.pipe(out);
        })
      );
      return {
        status: 201,
        body: { img: filenames },
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

export async function searchImages(query: string) {
  // const images = await google.image(body.template, { safe: false });
  const results = await image_search({
    query,
    moderate: true,
  });
  // download images
  const promises = results.slice(0, 4).map(async (result, index) => {
    const filename = `tmp${index}.png`;
    const options = {
      url: result.thumbnail,
      dest: `${process.cwd()}/src/images/${filename}`,
    };
    await download.image(options);
    return filename;
  });
  return Promise.all(promises);
}
