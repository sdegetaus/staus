import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default (props: LayoutProps) => {
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
