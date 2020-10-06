import React from "react";
import Body from "./Body";
import Head from "./Head";
import Html from "./Html";

const Root = ({ locale, page }: any) => {
  return (
    <Html locale={locale}>
      <Head></Head>
      <Body>{page.default({ locale })}</Body>
    </Html>
  );
};

export default Root;
