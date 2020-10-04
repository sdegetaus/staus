export type LanguageKey = {
  [key: string]: string;
};

export type LanguageDictionary = {
  [locale: string]: {
    messages: LanguageKey;
  };
};
