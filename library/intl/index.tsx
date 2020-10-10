import React from "react";

export default class Intl extends React.Component<IntlProps> {
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

  public static setLocaleData = (messages: LocaleData) => {
    Intl._localeData = messages;
  };

  private resolveTranslation = () => {
    const res = Intl._localeData[Intl._activeLocale].messages[this.props.id];
    return res == null ? this.props.id : res;
  };

  render() {
    // separate into two different components?
    return <>{this.resolveTranslation()}</>;
  }
}

type IntlProps = {
  id: string;
};

export type LocaleData = {
  [locale: string]: {
    messages: MessagePair;
  };
};

export type MessagePair = {
  [key: string]: string;
};
