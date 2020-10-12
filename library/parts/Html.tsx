import Intl from "../intl";
import React from "react";

export default (props: HtmlProps) => {
  const { locale, children } = props;
  return <html lang={locale ? locale : Intl.defaultLocale}>{children}</html>;
};

type HtmlProps = {
  locale?: string;
  children: JSX.Element[];
};
