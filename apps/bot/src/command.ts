import {
  ChatInputCommandInteraction,
  ChatInputApplicationCommandData,
} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
  run: (interaction: ChatInputCommandInteraction) => void;
}
