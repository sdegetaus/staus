import React from "react";
import Body from "./Body";
import Head from "./Head";
import Html from "./Html";

const Root = ({
  locale,
  id,
  page,
  stylesName,
  headScriptsName,
  bodyScriptsName,
}: RootProps) => {
  return (
    <Html locale={locale}>
      <Head stylesName={stylesName} headScriptsName={headScriptsName} />
      <Body bodyScriptsName={bodyScriptsName}>
        {page.default({ locale, id })}
      </Body>
    </Html>
  );
};

type RootProps = {
  locale: string;
  id: string;
  page: any;
  stylesName: string;
  headScriptsName: string;
  bodyScriptsName: string;
};

export default Root;
