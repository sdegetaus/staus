import React from "react";
import SEO from "../seo";

export default ({ stylesheetName = null }: HeadProps) => {
  const title = SEO.title;
  const description = SEO.description;
  return (
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      {title != null && <title>{title}</title>}
      {description != null && (
        <meta name="description" content={description.toString()} />
      )}

      {/* TODO:
        {{#each meta}}
          <meta name="{{this.name}}" content="{{this.content}}" />
        {{/each}}
      */}

      <link rel="icon" href="/favicon.png" type="image/png" />
      {stylesheetName !== null && (
        <link
          rel="stylesheet"
          type="text/css"
          href={`/${stylesheetName}.css`}
        />
      )}
    </head>
  );
};

type HeadProps = {
  stylesheetName?: string;
};
