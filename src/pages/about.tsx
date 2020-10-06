import React from "react";
import { Page } from "library";

class About extends Page {
  constructor() {
    super({
      title: "about.title",
      description: "about.description",
    });
  }

  public render = () => {
    return (
      <>
        <h1>About</h1>
        <p>
          Page: {"<"}About{"/>"} content
        </p>
      </>
    );
  };
}

export default new About();
