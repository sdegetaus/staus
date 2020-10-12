import { IntlMessage, SEO, intlMessage } from "library";
import { PageProps } from "library/types";
import React from "react";
import Layout from "../layout";

const Index = (props: PageProps): JSX.Element => {
  return (
    <Layout>
      <h1>
        <IntlMessage id="home.title" />
      </h1>
      <pre>{JSON.stringify(props, null, 4)}</pre>
    </Layout>
  );
};

export default (props: PageProps) =>
  SEO.connect(<Index {...props} />, {
    title: intlMessage("home.title"),
    description: "Description!",
  });
