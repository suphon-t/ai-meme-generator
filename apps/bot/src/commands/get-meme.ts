import { BufferResolvable, ChatInputCommandInteraction } from "discord.js";
import axios from "axios";
import { Command } from "../command";
import { GenericMemeIdea, MemeIdea, TemplateId } from "../templates.js";
import { download } from "../s3.js";
import { captureException } from "@sentry/node";

export const getMeme: Command = {
  name: "getmeme",
  description: "Fetch an AI generated meme from OpenAI",
  run: async (interaction: ChatInputCommandInteraction) => {
    try {
      // meme service
      const memeBrainServiceResponse = await axios.post(
        `${process.env.MEME_BRAIN_ENDPOINT}/generate_idea`
      );
      const memeIdea: MemeIdea = memeBrainServiceResponse.data;
      console.log(memeIdea);

      // image service
      if (memeIdea.templateId === undefined) {
        await interaction.followUp("An error occured, sorry");
        return;
      }

      let memeImageFilename: string;
      if (memeIdea.templateId === TemplateId.generic) {
        const genericMemeIdea = memeIdea.memeContent as GenericMemeIdea;
        const memeImageServiceResponse = await axios.post(
          `${process.env.MEME_IMAGE_ENDPOINT}/generic_memes`,
          {
            picture: genericMemeIdea.picture,
            text0: genericMemeIdea.text0,
            text1: genericMemeIdea.text1,
          }
        );
        memeImageFilename = memeImageServiceResponse.data.img[0];
      } else {
        const memeImageServiceResponse = await axios.post(
          `${process.env.MEME_IMAGE_ENDPOINT}/caption_template`,
          {
            template: memeIdea.templateId,
            text0: memeIdea.memeContent.text0,
            text1: memeIdea.memeContent.text1,
          }
        );
        memeImageFilename = memeImageServiceResponse.data.img;
      }

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
