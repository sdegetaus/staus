import { LocaleData } from "library/types";
import EnglishMessages from "./en_US.json";
import SpanishMessages from "./es_MX.json";

export const defaultLocale = "en";
export const localeData: LocaleData = {
  en: {
    messages: EnglishMessages,
  },
  es: {
    messages: SpanishMessages,
  },
};
