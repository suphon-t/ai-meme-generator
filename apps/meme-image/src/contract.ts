import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const contract = c.router({
  index: {
    method: "GET",
    path: "/",
    responses: { 200: z.object({ result: z.string() }) },
  },
  captionImage: {
    method: "POST",
    path: "/caption_template",
    responses: {
      201: z.object({
        img: z.string(),
      }),
    },
    body: z.object({
      template: z.string(),
      text0: z.string(),
      text1: z.string(),
    }),
    summary: "Caption a meme template",
  },
});
