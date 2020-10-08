import React from "react";

export default class Intl extends React.Component<IntlProps> {
  public static defaultLocale: string;
  public static activeLocale: string;
  public static baseUrl: string;
  private static intlData: LocaleData = null;

  // convert to high-order component:
  // https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775
  public static connect = (messages: LocaleData) => {
    Intl.intlData = messages;
  };

  private resolveTranslation = () => {
    const res = Intl.intlData[Intl.activeLocale].messages[this.props.id];
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
