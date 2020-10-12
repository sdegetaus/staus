import React from "react";
import { PageProps } from "../types";
import Body from "./Body";
import Head from "./Head";
import Html from "./Html";

export default ({
  locale,
  pageId,
  page,
  stylesName,
  headScriptsName,
  bodyScriptsName,
}: RootProps) => {
  return (
    <Html locale={locale}>
      <Head stylesName={stylesName} headScriptsName={headScriptsName} />
      <Body bodyScriptsName={bodyScriptsName}>
        {page.default({ locale, pageId })}
      </Body>
    </Html>
  );
};

interface RootProps extends PageProps {
  page: any; // get type?
  stylesName: string;
  headScriptsName: string;
  bodyScriptsName: string;
}
