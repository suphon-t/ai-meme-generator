import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} from "discord.js";
import { Command } from "../command";
import { generateMeme } from "../generate-meme.js";
import { stringToTemplateId } from "../templates.js";

export const customMeme: Command = {
  name: "custommeme",
  description: "Create a customized meme",
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: "template",
      description: "The meme template to use",
      required: true,
    },
    {
      type: ApplicationCommandOptionType.String,
      name: "topic",
      description: "The topic of the meme",
      required: false,
    },
  ],
  run: async (interaction: ChatInputCommandInteraction) => {
    const templateInput = interaction.options.getString("template") ?? "";
    const topic = interaction.options.getString("topic") ?? "";
    console.log("template input:", templateInput);
    const templateId = stringToTemplateId[templateInput];
    if (!templateId) {
      await interaction.followUp(
        `Invalid template. Valid templates are: ${Object.keys(
          stringToTemplateId
        ).join(", ")}.`
      );
      return;
    }
    const memeImageBuffer = await generateMeme({ templateId, topic });

    await interaction.followUp({
      content: `${interaction.user.username}'s meme is served`,
      files: [{ attachment: memeImageBuffer }],
    });
  },
};
