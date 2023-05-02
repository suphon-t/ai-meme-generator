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
  captionTemplate: {
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
    summary: "Caption a meme from a template",
  },
  genericMemes: {
    method: "POST",
    path: "/generic_memes",
    body: z.object({
      picture: z.string(),
      text0: z.string().optional(),
      text1: z.string().optional(),
    }),
    responses: {
      201: z.object({
        img: z.array(z.string()),
      }),
      400: z.object({
        message: z.string(),
      }),
    },
    summary: "Caption memes from image searches",
  },
});
