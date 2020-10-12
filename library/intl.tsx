import React from "react";
import { LocaleData } from "./types";

const Intl = {
  defaultLocale: "",
  activeLocale: "",
  localeData: null as LocaleData,
};

const translate = (id: string) => {
  const res = Intl.localeData[Intl.activeLocale].messages[id];
  return res == null ? id : res;
};

const IntlMessage = (props: IntlMessageProps) => {
  return <>{translate(props.id)}</>;
};

type IntlMessageProps = {
  id: string;
};

export default Intl;
export { IntlMessage, translate };
