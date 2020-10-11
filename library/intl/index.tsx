import React from "react";
import { LocaleData } from "../types";

abstract class Intl {
  public static defaultLocale: string;
  public static activeLocale: string;
  public static localeData: LocaleData = null;

  public static connect = (element: JSX.Element, messages: LocaleData) => {
    Intl.localeData = messages;
    return element;
  };
}

const intlMessage = (id: string) => {
  const res = Intl.localeData[Intl.activeLocale].messages[id];
  return res == null ? id : res;
};

const IntlMessage = (props: IntlMessageProps) => {
  return <>{intlMessage(props.id)}</>;
};

type IntlMessageProps = {
  id: string;
};

export default Intl;
export { IntlMessage, intlMessage };
