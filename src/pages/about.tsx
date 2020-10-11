import { IntlMessage } from "library";
import { PageProps } from "library/types";
import React from "react";
import Layout from "../layout";

export default (props: PageProps) => {
  return (
    <Layout>
      <h1>
        <IntlMessage id="about.title" />
      </h1>
    </Layout>
  );
};
