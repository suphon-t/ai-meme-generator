export const TEMPLATE = [
  "brian",
  "one",
  "bet",
  "scientist",
  "power",
  "future",
] as const;

export interface Box {
  x: number;
  y: number;
  w: number;
}

export const BOX: Record<string, { text0?: Box; text1?: Box }> = {
  bet: {
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
      y: 470,
      w: 190,
    },
  },
};
