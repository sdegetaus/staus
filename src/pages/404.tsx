import { PageProps } from "library/types";
import React from "react";
import Layout from "../layout";

export default (props: PageProps) => {
  return (
    <Layout>
      <h1>404</h1>
      <pre>{JSON.stringify(props, null, 4)}</pre>
    </Layout>
  );
};
