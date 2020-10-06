import React from "react";

export default (props: Props) => {
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
      <link rel="stylesheet" type="text/css" href="/style.css" />
    </head>
  );
};

type Props = {};
