import React from "react";
import { Page } from "library";

class Error404 extends Page {
  constructor() {
    super({
      title: "404.title",
      description: "404.description",
    });
  }

  public render = () => {
    return (
      <>
        <h1>404!</h1>
        <p>Page not found!</p>
      </>
    );
  };
}

export default new Error404();
