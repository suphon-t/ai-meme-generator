import axios from "axios";
import { GenericMemeIdea, MemeIdea, TemplateId } from "./templates.js";
import { download } from "./s3.js";

export interface GenerateMemeOptions {
  templateId?: TemplateId;
  topic?: string;
}

export async function generateMeme(options: GenerateMemeOptions = {}) {
  // meme service
  const memeBrainServiceResponse = await axios.post(
    `${process.env.MEME_BRAIN_ENDPOINT}/generate_idea`,
    {
      templateId: options.templateId,
      topic: options.topic,
    }
  );
  const memeIdea: MemeIdea = memeBrainServiceResponse.data;
  console.log(memeIdea);

  // image service
  if (memeIdea.templateId === undefined) {
    throw new Error("meme brain returned undefined template id");
  }

  let memeImageFilename: string;
  if (memeIdea.templateId === "generic") {
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
  const memeImageBuffer = await download(memeImageFilename)!;
  if (memeImageBuffer === undefined) {
    throw new Error("meme-image returned an empty image");
  }
  return memeImageBuffer;
}
