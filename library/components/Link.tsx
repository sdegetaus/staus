import Intl from "../intl";
import React from "react";

export default (props: LinkProps) => {
  const { to, title, style, target, children, ...attrs } = props;

  return (
    <a
      href={localizeHref(to)}
      title={title != null ? title : undefined}
      style={style}
      target={target != null ? target : undefined}
      {...attrs}
    >
      {children}
    </a>
  );
};

type LinkProps = {
  to: string;
  title?: string;
  style?: React.CSSProperties;
  target?: string;
  children: JSX.Element | string;
  [key: string]: any;
};

const localizeHref = (to: string) => {
  const activeLocale = Intl.getActiveLocale();
  const defaultLocale = Intl.getDefaultLocale();
  const noSlash = to.replace("/", ""); // normalize href
  if (activeLocale === defaultLocale) {
    return `/${noSlash}`;
  } else {
    return `/${activeLocale}/${noSlash}`;
  }
};
