import { Intl, IntlMessage } from "library";
import React from "react";
import { localeData } from "../intl";
import Layout from "../layout";

export default (props: PageProps) => {
  Intl.connect(localeData);
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
