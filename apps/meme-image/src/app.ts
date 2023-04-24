import express from "express";
import bodyParser from "body-parser";
import { contract } from "./contract";
import { initServer, createExpressEndpoints } from "@ts-rest/express";

import fs from "fs";
import { createCanvas, loadImage, registerFont } from "canvas";

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
    const load_path = `./src/template/${body.template}.png`;
    const image = await loadImage(load_path);

    const text0 = body.text0.toUpperCase();
    const text1 = body.text1.toUpperCase();
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    ctx.font = "36px Impact";
    ctx.fillStyle = "white";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";

    const td0 = ctx.measureText(text0);
    const tw0 = td0.width;
    const th0 = td0.actualBoundingBoxAscent + td0.actualBoundingBoxDescent;

    const mx0 = Math.floor((image.naturalWidth - tw0) / 2);
    // const my = Math.floor((image.naturalHeight - th) / 2);

    const x0 = mx0;
    const y0 = th0 + 8;
    ctx.strokeText(text0, x0, y0);
    ctx.fillText(text0, x0, y0);

    const td1 = ctx.measureText(text1);
    const tw1 = td1.width;

    const mx1 = Math.floor((image.naturalWidth - tw1) / 2);

    const x1 = mx1;
    const y1 = image.height - 8;
    ctx.strokeText(text1, x1, y1);
    ctx.fillText(text1, x1, y1);

    const save_path = `./src/images/1.png`;
    const out = fs.createWriteStream(save_path);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("Done"));
    return {
      status: 201,
      body: { img: save_path },
    };
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
