import dotenv from "dotenv";
import { Client, Events, GatewayIntentBits, Interaction } from "discord.js";
import { Commands } from "./commands/index.js";
import { init as initSentry, captureException } from "@sentry/node";

dotenv.config();

initSentry({
  dsn: process.env.SENTRY_DSN,
});

const client: Client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (c) => {
  if (!client.user || !client.application) {
    return;
  }

  await client.application.commands.set(Commands);

  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  // console.log(interaction);
  const slashCommand = Commands.find((c) => c.name === interaction.commandName);

  if (!slashCommand) {
    interaction.reply("An error has occured");
    return;
  }

  await interaction.deferReply();
  try {
    await slashCommand.run(interaction);
  } catch (err) {
    captureException(err);
    await interaction.followUp("An error occured, sorry");
  }
});

client.on(Events.Error, async (e) => {
  captureException(e);
});

client.login(process.env.DISCORD_TOKEN);
