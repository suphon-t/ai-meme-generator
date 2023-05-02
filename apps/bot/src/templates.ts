enum TemplateName {
  "coupleInBed",
  "scientist",
  "power",
  "future",
}

export interface MemeText {
  text0?: string;
  text1?: string;
}

export interface MemeIdea {
  templateId: string;
  templateName: string;
  memeContent: MemeText;
}

export interface MemeImageRequest {
  template: TemplateName;
  text0?: string;
  text1?: string;
}
