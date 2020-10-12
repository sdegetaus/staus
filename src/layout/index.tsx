import { Intl, SEO } from "library";
import { PageProps } from "library/types";
import React from "react";
import { localeData } from "../intl";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props: LayoutProps) => {
  SEO.setMeta([{ name: "theme-color", content: "#FF0000" }]); // todo: improve
  return (
    <div id="main">
      <Header pageId={props.pageId} locale={props.locale} />
      {props.children}
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <Footer />
    </div>
  );
};

interface LayoutProps extends PageProps {
  children?: JSX.Element | JSX.Element[];
}

export default (props: LayoutProps) =>
  Intl.connect(<Layout {...props} />, localeData);
