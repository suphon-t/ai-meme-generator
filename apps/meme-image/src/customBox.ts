export const TEMPLATE = [
  "brian",
  "oneDoesNotSimply",
  "coupleInBed",
  "scientist",
  "power",
  "future",
  "surprisedPikachu",
  "takeMyMoney",
  "tradeOffer",
  "uno",
] as const;

export interface Box {
  x: number;
  y: number;
  w: number;
}

export const BOX: Record<string, { text0?: Box; text1?: Box }> = {
  coupleInBed: {
    text0: {
      x: 25,
      y: 275,
      w: 400,
    },
    text1: {
      x: 400,
      y: 375,
      w: 400,
    },
  },
  power: {
    text0: {
      x: 0,
      y: 460,
      w: 190,
    },
  },
  surprisedPikachu: {
    text0: {
      x: 0,
      y: 125,
      w: 500,
    },
  },
  tradeOffer: {
    text0: {
      x: 10,
      y: 230,
      w: 200,
    },
    text1: {
      x: 275,
      y: 230,
      w: 200,
    },
  },
  uno: {
    text0: {
      x: 50,
      y: 225,
      w: 200,
    },
    text1: {
      x: 275,
      y: 90,
      w: 200,
    },
  },
};
