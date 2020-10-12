import React from "react";
import { SEO } from "../types";

export default (props: HeadProps) => {
  const { title, description, meta, stylesName, headScriptsName } = props;
  return (
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      {title != null && <title>{title}</title>}
      {description != null && <meta name="description" content={description} />}
      {meta != null &&
        meta.map((o) => (
          <meta key={o.name} name={o.name} content={o.content} />
        ))}
      {/* todo: make conditional */}
      <link rel="icon" href="/favicon.png" type="image/png" />
      {stylesName !== null && (
        <link
          id={stylesName}
          rel="stylesheet"
          type="text/css"
          href={`/${stylesName}.css`}
        />
      )}
      {headScriptsName !== null && (
        <script type="text/javascript" src={`/${headScriptsName}.js`}></script>
      )}
    </head>
  );
};

interface HeadProps extends SEO {
  stylesName?: string;
  headScriptsName?: string;
}
