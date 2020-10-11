import { Intl, SEO } from "library";
import React from "react";
import { localeData } from "../intl";
import Footer from "./Footer";
import Header from "./Header";

const Layout = (props: LayoutProps) => {
  SEO.setMeta([{ name: "theme-color", content: "#FF0000" }]); // todo: improve
  return (
    <div id="main">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

type LayoutProps = {
  children?: JSX.Element | JSX.Element[];
};

export default (props: LayoutProps) =>
  Intl.connect(<Layout {...props} />, localeData);
