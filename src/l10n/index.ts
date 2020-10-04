import { LanguageDictionary } from "../../staus/classes/page"; // todo: change location
import * as EnglishMessages from "./en_US.json";
import * as SpanishMessages from "./es_MX.json";

export const l10n: LanguageDictionary = {
  es: {
    messages: SpanishMessages,
  },
  en: {
    messages: EnglishMessages,
  },
};
