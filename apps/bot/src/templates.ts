export enum TemplateId {
  "generic",
  "tradeOffer",
  "coupleInBed",
  "surprisedPikachu",
  "power",
  "future",
  "scientist",
  "takeMyMoney",
  "brian",
  "oneDoesNotSimply",
  "uno",
}

export const stringToTemplateId = {
  generic: TemplateId.generic,
  tradeOffer: TemplateId.tradeOffer,
  coupleInBed: TemplateId.coupleInBed,
  surprisedPikachu: TemplateId.surprisedPikachu,
  power: TemplateId.power,
  future: TemplateId.future,
  scientist: TemplateId.scientist,
  takeMyMoney: TemplateId.takeMyMoney,
  brian: TemplateId.brian,
  oneDoesNotSimply: TemplateId.oneDoesNotSimply,
  uno: TemplateId.uno,
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
