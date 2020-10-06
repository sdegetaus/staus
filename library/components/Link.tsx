import Intl from "../intl";
import React from "react";

export default (props: LinkProps) => {
  const { to, title, style, target, children, ...attrs } = props;

  console.log(Intl.activeLocale, Intl.defaultLocale, Intl.baseUrl);

  const newHref =
    Intl.activeLocale === Intl.defaultLocale
      ? to
      : `/${Intl.activeLocale}${to}`;

  return (
    <a
      href={newHref}
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
