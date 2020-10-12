import { IntlMessage, intlMessage, SEO } from "library";
import { PageProps } from "library/types";
import React from "react";
import Layout from "../layout";

const About = (props: PageProps) => {
  return (
    <Layout {...props}>
      <h1>
        <IntlMessage id="about.title" />
      </h1>
    </Layout>
  );
};

export default (props: PageProps) =>
  SEO.connect(<About {...props} />, {
    title: intlMessage("about.title"),
    description: "Description!",
    slug: intlMessage("about.title"),
  });
