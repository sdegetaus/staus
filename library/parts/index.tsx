import React from "react";
import { SEO } from "types";
import Body from "./Body";
import Head from "./Head";
import Html from "./Html";

export default (props: RootProps) => {
  const {
    locale,
    pageId,
    page,
    stylesName,
    headScriptsName,
    bodyScriptsName,
    ...seo
  } = props;
  return (
    <Html locale={locale}>
      <Head
        headScriptsName={headScriptsName}
        stylesName={stylesName}
        {...seo}
      />
      <Body bodyScriptsName={bodyScriptsName}>
        {page.default({ locale, pageId })}
      </Body>
    </Html>
  );
};

interface RootProps extends SEO {
  locale: string;
  pageId: string;
  page: any;
  stylesName: string;
  headScriptsName: string;
  bodyScriptsName: string;
}
