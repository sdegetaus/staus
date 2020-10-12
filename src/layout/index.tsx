import { PageProps } from "library/types";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default (props: LayoutProps) => {
  return (
    <div id="main">
      <Header pageId={props.pageId} locale={props.locale} />
      {props.children}
      <pre>
        {JSON.stringify(
          { locale: props.locale, pageId: props.pageId },
          null,
          2
        )}
      </pre>
      <Footer />
    </div>
  );
};

interface LayoutProps extends PageProps {
  children?: JSX.Element | JSX.Element[];
}
