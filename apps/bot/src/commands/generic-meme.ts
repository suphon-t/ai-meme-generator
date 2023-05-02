import { BufferResolvable, ChatInputCommandInteraction } from "discord.js";
import axios from "axios";
import { Command } from "../command";
import { GenericMemeIdea } from "../templates";
import { download } from "../s3.js";
import { captureException } from "@sentry/node";

export const genericMeme: Command = {
  name: "getgenericmeme",
  description: "Make a meme with no template from OpenAI and image search",
  run: async (interaction: ChatInputCommandInteraction) => {
    try {
      // meme service
      const memeBrainServiceResponse = await axios.post(
        `${process.env.MEME_BRAIN_ENDPOINT}/generate_idea`,
        {
          templateId: "generic",
        }
      );
      const memeIdea: GenericMemeIdea =
        memeBrainServiceResponse.data.memeContent;
      console.log(memeIdea);

      // image service
      const memeImageServiceResponse = await axios.post(
        `${process.env.MEME_IMAGE_ENDPOINT}/generic_memes`,
        {
          picture: memeIdea.picture,
          text0: memeIdea.text0,
          text1: memeIdea.text1,
        }
      );
      const memeImageFilename: string = memeImageServiceResponse.data.img[0];

      // get image
      console.log(memeImageFilename);
      const memeImageBuffer = (await download(
        memeImageFilename
      )!) as BufferResolvable;

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
