import React from "react";
import SEO from "../seo";

export default ({ stylesName = null, headScriptsName = null }: HeadProps) => {
  const title = SEO.title;
  const description = SEO.description;
  const meta = SEO.meta;
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
      <link rel="icon" href="/favicon.png" type="image/png" />
      {stylesName !== null && (
        <link rel="stylesheet" type="text/css" href={`/${stylesName}.css`} />
      )}
      {headScriptsName !== null && (
        <script type="text/javascript" src={`/${headScriptsName}.js`}></script>
      )}
    </head>
  );
};

type HeadProps = {
  stylesName?: string;
  headScriptsName?: string;
};
