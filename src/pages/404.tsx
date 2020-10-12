import { PageProps } from "library/types";
import React from "react";
import Layout from "../layout";

export default (props: PageProps) => {
  return (
    <Layout {...props}>
      <h1>404</h1>
    </Layout>
  );
};
