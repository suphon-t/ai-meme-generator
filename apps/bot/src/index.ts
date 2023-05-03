import dotenv from "dotenv";
import { Client, Events, GatewayIntentBits, Interaction } from "discord.js";
import { Commands } from "./commands/index.js";
import { init as initSentry, captureException } from "@sentry/node";
import { isAxiosError } from "axios";

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
    if (isAxiosError(err)) {
      await interaction.followUp(
        `An error occured, sorry\nAxios Error: ${err.message}\n${err.config?.url}\n${err.response?.data}`
      );
    } else if (err instanceof Error) {
      await interaction.followUp(
        `An error occured, sorry\nError: ${err.message}\n${err.stack}`
      );
    } else {
      await interaction.followUp(`An error occured, sorry`);
    }
  }
});

client.on(Events.Error, async (e) => {
  captureException(e);
});

client.login(process.env.DISCORD_TOKEN);
