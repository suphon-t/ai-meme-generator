import { Canvas, CanvasRenderingContext2D, Image } from "canvas";
import { Box } from "./customBox";

const MAX_LINE = 3;
const FONT_SIZE = 36;

export function writeCaption(
  image: Image,
  canvas: Canvas,
  text0: string | undefined,
  text1: string | undefined
) {
  const ctx = createCtx(image, canvas);
  // top text
  if (text0) {
    let fontSize = FONT_SIZE;
    let lines = wrapText(ctx, text0, image.naturalWidth, fontSize);
    while (lines.length > MAX_LINE) {
      fontSize -= 4;
      lines = wrapText(ctx, text0, image.naturalWidth, fontSize);
    }
    lines.forEach((line, index) => {
      const [text, x] = line;
      const y = (index + 1) * fontSize;
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
    });
  }

  // bottom text
  if (text1) {
    let fontSize = FONT_SIZE;
    let lines = wrapText(ctx, text1, image.naturalWidth, fontSize);
    while (lines.length > MAX_LINE && fontSize > 4) {
      fontSize -= 4;
      lines = wrapText(ctx, text1, image.naturalWidth, fontSize);
    }
    lines.forEach((line, index) => {
      const [text, x] = line;
      const y = image.naturalHeight - index * fontSize - 8;
      ctx.strokeText(text, x, y);
      ctx.fillText(text, x, y);
    });
  }
  // const td0 = ctx.measureText(text0);
  // const tw0 = td0.width;
  // const th0 = td0.actualBoundingBoxAscent + td0.actualBoundingBoxDescent;
  // const mx0 = Math.floor((image.naturalWidth - tw0) / 2);
  // const x0 = mx0;
  // const y0 = th0 + 8;
  // ctx.strokeText(text0, x0, y0);
  // ctx.fillText(text0, x0, y0);

  // const td1 = ctx.measureText(text1);
  // const tw1 = td1.width;
  // const mx1 = Math.floor((image.naturalWidth - tw1) / 2);
  // const x1 = mx1;
  // const y1 = image.height - 8;
  // ctx.strokeText(text1, x1, y1);
  // ctx.fillText(text1, x1, y1);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontSize: number
) {
  // First, start by splitting all of our text into words, but splitting it into an array split by spaces
  const words = text.split(" ");
  let line = ""; // This will store the text of the current line
  let testLine = ""; // This will store the text when we add a word, to test if it's too long
  const lineArray = []; // This is an array of lines, which the function will return
  ctx.font = `${fontSize}px Impact`;

  // Lets iterate over each word
  for (let i = 0; i < words.length; i++) {
    // Create a test line, and measure it..
    testLine += `${words[i]} `;
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    // If the width of this test line is more than the max width
    if (i === 0 || testWidth <= maxWidth) {
      // If the test line is still less than the max width, then add the word to the current line
      line += `${words[i]} `;
    } else {
      // Then the line is finished, push the current line into "lineArray"
      const lineWidth = ctx.measureText(line).width;
      const mx = (maxWidth - lineWidth) / 2; // center x
      lineArray.push([line, mx] as const);
      // Increase the line height, so a new line is started
      // y += fontSize;
      // Update line and test line to use this word as the first word on the next line
      line = `${words[i]} `;
      testLine = `${words[i]} `;
    }
    // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
    if (i === words.length - 1) {
      const lineWidth = ctx.measureText(line).width;
      const mx = (maxWidth - lineWidth) / 2; // center x
      lineArray.push([line, mx] as const);
    }
  }
  // Return the line array
  return lineArray;
}

export function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  box: Box
) {
  let fontSize = FONT_SIZE;
  let lines = wrapText(ctx, text, box.w, fontSize);
  while (lines.length > MAX_LINE) {
    fontSize -= 4;
    lines = wrapText(ctx, text, box.w, fontSize);
  }
  lines.forEach((line, index) => {
    const [text, x] = line;
    const y = (-lines.length / 2 + index) * fontSize;
    ctx.strokeText(text, x + box.x, y + box.y);
    ctx.fillText(text, x + box.x, y + box.y);
  });
}

export function createCtx(image: Image, canvas: Canvas) {
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  ctx.fillStyle = "white";
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  return ctx;
}
