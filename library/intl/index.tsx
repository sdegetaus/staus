import React from "react";

// not super happy with these getters/setters....
abstract class Intl {
  private static _defaultLocale: string;
  private static _activeLocale: string;
  private static _localeData: LocaleData = null;

  public static getDefaultLocale = () => Intl._defaultLocale;
  public static setDefaultLocale = (locale: string) => {
    Intl._defaultLocale = locale;
  };

  public static getActiveLocale = () => Intl._activeLocale;
  public static setActiveLocale = (locale: string) => {
    Intl._activeLocale = locale;
  };

  public static getActiveLocaleData = () =>
    Intl._localeData[Intl._activeLocale];

  public static connect = (messages: LocaleData) => {
    Intl._localeData = messages;
  };
}

const IntlMessage = (props: IntlMessageProps) => {
  const resolveTranslation = () => {
    const res = Intl.getActiveLocaleData().messages[props.id];
    return res == null ? props.id : res;
  };
  return <>{resolveTranslation()}</>;
};

type IntlMessageProps = {
  id: string;
};

type LocaleData = {
  [locale: string]: {
    messages: MessagePair;
  };
};

type MessagePair = {
  [key: string]: string;
};

export default Intl;
export { IntlMessage, LocaleData, MessagePair };
