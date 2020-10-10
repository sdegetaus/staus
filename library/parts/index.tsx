import React from "react";
import Body from "./Body";
import Head from "./Head";
import Html from "./Html";

const Root = ({ locale, page, stylesheetName }: RootProps) => {
  return (
    <Html locale={locale}>
      <Head stylesheetName={stylesheetName} />
      <Body>{page.default({ locale })}</Body>
    </Html>
  );
};

type RootProps = {
  locale: string;
  page: any;
  stylesheetName: string;
};

export default Root;
