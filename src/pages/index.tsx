import { IntlMessage, SEO } from "library";
import React from "react";
import Layout from "../layout";

const Index = (props: PageProps): JSX.Element => {
  return (
    <Layout>
      <h1>
        <IntlMessage id="home.title" />
      </h1>
    </Layout>
  );
};

type PageProps = {
  locale: string;
};

export default (props: PageProps) =>
  SEO.connect(<Index {...props} />, {
    title: <IntlMessage id="home.title" />,
    description: "Description!",
  });
