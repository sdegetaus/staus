import { Intl } from "library";
import React from "react";
import { locales } from "../intl";
import Layout from "../layout";

export default (props: PageProps) => {
  Intl.connect(locales[props.locale].messages);
  return (
    <Layout>
      <h1>
        <Intl id="home.title" />
      </h1>
    </Layout>
  );
};

interface PageProps {
  locale: string;
}
