import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default (props: Props) => {
  return (
    <div id="main">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

type Props = {
  children?: JSX.Element;
};
