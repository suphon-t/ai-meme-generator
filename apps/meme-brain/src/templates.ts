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
  - text0: the top text in the meme (optional)
  - text1: the bottom text in the meme
  `,
  z.object({
    picture: z.string(),
    text0: z.string().optional(),
    text1: z.string(),
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

const power = template(
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

const future = template(
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
  - text1: the text in the meme
  `,
  z.object({
    text1: z.string(),
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

const brian = template(
  "Bad Luck Brian",
  `
  please give me a meme idea using the "Bad Luck Brian" meme template.

  you must respond with a valid json object containing 1 attribute:
  - text0: the top text in the meme
  - text1: the bottom text in the meme
  `,
  z.object({
    text0: z.string(),
    text1: z.string(),
  })
);

const oneDoesNotSimply = template(
  "One Does Not Simply",
  `
  please give me a meme idea using the "One Does Not Simply" meme template.

  you must respond with a valid json object containing 1 attribute:
  - text0: the top text in the meme
  - text1: the bottom text in the meme
  `,
  z.object({
    text0: z.string(),
    text1: z.string(),
  })
);

// const uno = template(
//   "UNO Draw 25 Cards",
//   `
//   please give me a meme idea using the "UNO Draw 25 Cards" meme template.

//   you must respond with a valid json object containing 1 attribute without trailing commas:
//   - text0: a short action in the card, which makes sense but one would not do. Do not include "draw 25 cards"
//   `,
//   z.object({
//     text0: z.string(),
//   })
// );

export const templates = {
  generic,
  tradeOffer,
  coupleInBed,
  surprisedPikachu,
  power,
  future,
  scientist,
  takeMyMoney,
  brian,
  oneDoesNotSimply,
  // uno,
} as const;
