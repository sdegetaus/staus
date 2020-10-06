import React from "react";
import { Page } from "staus";
import Layout from "../layout";

class Index extends Page {
  constructor() {
    super({
      title: "home.title",
      description: "home.description",
    });
  }

  public render = () => {
    return (
      <Layout>
        <>
          <h1>Home</h1>
        </>
      </Layout>
    );
  };
}

export default new Index();
