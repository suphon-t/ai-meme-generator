import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../command";
import { captureException } from "@sentry/node";
import { generateMeme } from "../generate-meme";

export const getMeme: Command = {
  name: "getmeme",
  description: "Fetch an AI generated meme from OpenAI",
  run: async (interaction: ChatInputCommandInteraction) => {
    try {
      const memeImageBuffer = await generateMeme();

      await interaction.followUp({
        content: `${interaction.user.username}'s meme is served`,
        files: [{ attachment: memeImageBuffer }],
      });
    } catch (err) {
      captureException(err);
      await interaction.followUp("An error occured, sorry");
    }
  },
};
