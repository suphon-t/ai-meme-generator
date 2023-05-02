enum TemplateId {
  "generic",
  "tradeOffer",
  "coupleInBed",
  "surprisedPikachu",
  "power",
  "future",
  "scientist",
  "takeMyMoney",
  "brian",
}

export interface MemeText {
  text0?: string;
  text1?: string;
}

export interface MemeIdea {
  templateId: TemplateId;
  templateName: string;
  memeContent: MemeText;
}

export interface MemeImageRequest {
  template: TemplateId;
  text0?: string;
  text1?: string;
}
