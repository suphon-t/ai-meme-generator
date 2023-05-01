import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const contract = c.router({
  index: {
    method: "GET",
    path: "/",
    responses: { 200: z.string() },
  },
  generateIdea: {
    method: "POST",
    path: "/generate_idea",
    responses: {
      200: z.object({
        templateId: z.string(),
        templateName: z.string(),
        memeContent: z.any(),
      }),
    },
    body: z.object({
      templateId: z.string().optional(),
    }),
    summary: "Caption a meme template",
  },
});
