import { ChatInputCommandInteraction } from "discord.js";
import { Command } from "../command";

export const hi: Command = {
  name: "hi",
  description: "Hello",
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.followUp(`Hello ${interaction.user.username}`);
  },
};
