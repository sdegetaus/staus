import React from "react";
import { LocaleData } from "../types";

// not super happy with these getters/setters....
abstract class Intl {
  public static defaultLocale: string;
  public static activeLocale: string;
  public static localeData: LocaleData = null;

  public static getActiveLocaleData = () => Intl.localeData[Intl.activeLocale];

  public static connect = (element: JSX.Element, messages: LocaleData) => {
    Intl.localeData = messages;
    return element;
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

export default Intl;
export { IntlMessage };
