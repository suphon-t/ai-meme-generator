import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} from "discord.js";
import { Command } from "../command";
import { generateMeme } from "../generate-meme";
import { stringToTemplateId } from "../templates";

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
  ],
  run: async (interaction: ChatInputCommandInteraction) => {
    const templateId =
      stringToTemplateId[
        (interaction.options.getString("template") ??
          "") as keyof typeof stringToTemplateId
      ];
    if (templateId === null) {
      await interaction.followUp(
        `Invalid template. Valid templates are: ${Object.keys(
          stringToTemplateId
        ).join(", ")}.`
      );
      return;
    }
    const memeImageBuffer = await generateMeme({ templateId });

    await interaction.followUp({
      content: `${interaction.user.username}'s meme is served`,
      files: [{ attachment: memeImageBuffer }],
    });
  },
};
