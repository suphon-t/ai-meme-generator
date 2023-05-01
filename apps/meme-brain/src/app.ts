import { Template, templates } from "./templates";
import { initServer } from "@ts-rest/express";
import { OpenAIApi, Configuration } from "openai";
import { env } from "./env";
import { contract } from "./contract";
import { z } from "zod";

const openaiConfig = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfig);

const s = initServer();

export const router = s.router(contract, {
  index: async () => {
    return { status: 200, body: "Hello World!" };
  },
  generateIdea: async ({ body }) => {
    const templateId = body.templateId ?? randomMemeTemplate();
    const template = templates[templateId];
    if (!template) {
      throw new Error("Invalid template");
    }

    const memeContent = await generateMeme(template);

    return {
      status: 200,
      body: { templateId, templateName: template.name, memeContent },
    };
  },
});

async function generateMeme<T extends z.AnyZodObject>(template: Template<T>) {
  const { data } = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: template.prompt,
      },
    ],
  });
  const [choice] = data.choices;
  if (!choice.message) {
    throw new Error("No message returned from OpenAI");
  }
  const { content } = choice.message;
  return template.shape.parse(JSON.parse(content));
}

function randomMemeTemplate() {
  const templateIds = Object.keys(templates);
  const randomIndex = Math.floor(Math.random() * templateIds.length);
  return templateIds[randomIndex];
}
