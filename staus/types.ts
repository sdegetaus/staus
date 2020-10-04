export type LanguageKey = {
  [key: string]: string;
};

export type LanguageDictionary = {
  [locale: string]: {
    messages: LanguageKey;
  };
};

export type StausConfig = {
  outDir: string;
  inDir: string;
  minify: boolean;
  defaultLanguage: string;
};
