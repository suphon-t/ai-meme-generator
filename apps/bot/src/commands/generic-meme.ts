import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../command";
import { TemplateId } from "../templates.js";
import { generateMeme } from "../generate-meme.js";

export const genericMeme: Command = {
  name: "getgenericmeme",
  description: "Make a meme with no template from OpenAI and image search",
  run: async (interaction: ChatInputCommandInteraction) => {
    const memeImageBuffer = await generateMeme({
      templateId: TemplateId.generic,
    });

    await interaction.followUp({
      content: `${interaction.user.username}'s meme is served`,
      files: [{ attachment: memeImageBuffer }],
    });
  },
};
