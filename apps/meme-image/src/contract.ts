import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { TEMPLATE } from "./customBox";

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
    body: z.object({
      template: z.enum(TEMPLATE),
      text0: z.string().optional(),
      text1: z.string().optional(),
    }),
    responses: {
      201: z.object({
        img: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
    summary: "Caption a meme template",
  },
  searchImages: {
    method: "POST",
    path: "/search",
    body: z.object({
      template: z.string(),
    }),
    responses: {
      201: z.object({
        img: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
    summary: "Image Search",
  },
});
