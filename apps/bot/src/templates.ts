export type TemplateId =
  | "generic"
  | "tradeOffer"
  | "coupleInBed"
  | "surprisedPikachu"
  | "power"
  | "future"
  | "scientist"
  | "takeMyMoney"
  | "brian"
  | "oneDoesNotSimply"
  | "uno";

export const stringToTemplateId: Record<string, TemplateId | undefined> = {
  generic: "generic",
  tradeOffer: "tradeOffer",
  coupleInBed: "coupleInBed",
  surprisedPikachu: "surprisedPikachu",
  power: "power",
  future: "future",
  scientist: "scientist",
  takeMyMoney: "takeMyMoney",
  brian: "brian",
  oneDoesNotSimply: "oneDoesNotSimply",
  uno: "uno",
};

export interface MemeText {
  text0?: string;
  text1?: string;
}

export interface GenericMemeIdea {
  picture: string;
  text0?: string;
  text1?: string;
}

export interface MemeIdea {
  templateId: TemplateId;
  templateName: string;
  memeContent: MemeText | GenericMemeIdea;
}

export interface MemeImageRequest {
  template: TemplateId;
  text0?: string;
  text1?: string;
}
