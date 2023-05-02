import { z } from "zod";

export interface Template<Shape extends z.AnyZodObject> {
  name: string;
  prompt: string;
  shape: Shape;
}

function template<Shape extends z.AnyZodObject>(
  name: string,
  prompt: string,
  shape: Shape
): Template<Shape> {
  return { name, prompt, shape } as const;
}

const generic = template(
  "Generic",
  `
  please give me a meme idea.

  you must respond with a valid json object containing 2 attributes:
  - picture: the description of the picture in the meme
  `,
  z.object({
    picture: z.string(),
  })
);

const tradeOffer = template(
  "Trade Offer",
  `
  please give me a meme idea using the "Trade Offer" meme template.

  you must respond with a valid json object containing 2 attributes:
  - text0: the text to put in the "I receive" box
  - text1: the text to put in the "You receive" box
  `,
  z.object({
    text0: z.string(),
    text1: z.string(),
  })
);

const coupleInBed = template(
  "Couple in Bed",
  `
  please give me a meme idea using the "I Bet He's Thinking About Other Women" meme template.

  you must respond with a valid json object containing 2 attributes:
  - text0: the text in the woman's mind
  - text1: the text in the man's mind
  `,
  z.object({
    text0: z.string(),
    text1: z.string(),
  })
);

const surprisedPikachu = template(
  "Surprised Pikachu",
  `
  please give me a meme idea using the "Surprised Pikachu" meme template.

  you must respond with a valid json object containing 1 attribute:
  - text0: the text in the meme
  `,
  z.object({
    text0: z.string(),
  })
);

const feelingsAboutPower = template(
  "Feelings About Power",
  `
  please give me a meme idea using the "What Gives People Feelings of Power" meme template.

  you must respond with a valid json object containing 1 attribute:
  - text0: the thing that gives people feelings of power
  `,
  z.object({
    text0: z.string(),
  })
);

const futureWorldIf = template(
  "Future World If",
  `
  please give me a meme idea using the "The future world if" meme template.

  you must respond with a valid json object containing 1 attribute:
  - text0: the text in the meme
  `,
  z.object({
    text0: z.string(),
  })
);

const scientist = template(
  "Scientist",
  `
  please give me a meme idea using the "You know, I'm something of a scientist myself" meme template.

  you must respond with a valid json object containing 1 attribute:
  - text0: the text in the meme
  `,
  z.object({
    text0: z.string(),
  })
);

const takeMyMoney = template(
  "Take My Money",
  `
  please give me a meme idea using the "Shut Up and Take My Money" meme template.

  you must respond with a valid json object containing 1 attribute:
  - text0: the text in the meme
  `,
  z.object({
    text0: z.string(),
  })
);

export const templates = {
  generic,
  tradeOffer,
  coupleInBed,
  surprisedPikachu,
  feelingsAboutPower,
  futureWorldIf,
  scientist,
  takeMyMoney,
} as const;
