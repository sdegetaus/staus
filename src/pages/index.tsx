import { IntlMessage, translate } from "library";
import { PageProps, SEO } from "library/types";
import React from "react";
import Layout from "../layout";
import { DefaultSEO } from "../test";

export default (props: PageProps) => {
  return (
    <Layout {...props}>
      <h1>
        <IntlMessage id="home.title" />
      </h1>
    </Layout>
  );
};

export const LoadSEO = (): SEO => {
  return {
    ...DefaultSEO,
    title: translate("home.title"),
    description: "This is the index page!",
  };
};
