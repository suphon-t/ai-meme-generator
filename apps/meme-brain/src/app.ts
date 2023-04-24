import { Template, templates } from "./templates";
import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { OpenAIApi, Configuration } from "openai";
import { env } from "./env";

const openaiConfig = new Configuration({
  apiKey: env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfig);

export const appRouter = router({
  helloWorld: publicProcedure.query(async () => {
    return "Hello World!";
  }),
  generate: publicProcedure
    .input(
      z.object({
        templateId: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const templateId = input.templateId ?? randomMemeTemplate();
      const template = templates[templateId];
      if (!template) {
        throw new Error("Invalid template");
      }

      const memeContent = await generateMeme(template);

      return { templateId, templateName: template.name, memeContent };
    }),
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
