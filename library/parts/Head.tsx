import React from "react";

export default ({ stylesheetName = null }: HeadProps) => {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />

      {/* TODO:
      
      {{#if title}}
    <title>{{title}}</title>
  {{/if}}

  {{#if description}}
    <meta name="description" content="{{description}}" />
  {{/if}}

  {{#each meta}}
    <meta name="{{this.name}}" content="{{this.content}}" />
  {{/each}} */}

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
