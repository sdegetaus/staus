import { IntlMessage, intlMessage, SEO } from "library";
import { PageProps } from "library/types";
import React from "react";
import Layout from "../layout";

const Index = (props: PageProps): JSX.Element => {
  return (
    <Layout {...props}>
      <h1>
        <IntlMessage id="home.title" />
      </h1>
    </Layout>
  );
};

export default (props: PageProps) =>
  SEO.connect(<Index {...props} />, {
    title: intlMessage("home.title"),
    description: "Description!",
  });
