import { ChatInputCommandInteraction } from "discord.js";
import axios from "axios";
import { Command } from "../command";
import { MemeIdea } from "../templates";
import { download } from "../s3.js";

export const getMeme: Command = {
  name: "getmeme",
  description: "Fetch an AI generated meme from OpenAI",
  run: async (interaction: ChatInputCommandInteraction) => {
    // meme service
    const memeBrainServiceResponse = await axios.post(
      `${process.env.MEME_BRAIN_ENDPOINT}/generate_idea`
    );
    const memeIdea: MemeIdea = memeBrainServiceResponse.data;

    // image service
    if (memeIdea.templateId === undefined) {
      await interaction.followUp(`An error occured, sorry`);
      return;
    }
    const memeImageServiceResponse = await axios.post(
      `${process.env.MEME_IMAGE_ENDPOINT}/caption_template`,
      {
        template: memeIdea.templateId,
        text0: memeIdea.memeContent.text0,
        text1: memeIdea.memeContent.text1,
      }
    );
    const memeImageFilename: string = memeImageServiceResponse.data.img;

    console.log(memeImageFilename);
    download(memeImageFilename);

    // get image
    await interaction.followUp(`${interaction.user.username}'s meme is served`);
  },
};
