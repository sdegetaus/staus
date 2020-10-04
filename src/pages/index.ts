import Page from "../../library/page";

class Index extends Page {
  constructor() {
    super(
      { language: "es" },
      { title: "Home" },
      {
        content: `<h1>Home</h1><a href="/about">About</a> {{language}}`,
      },
      { test: "can be translated!" }
    );
  }
}

export default new Index();
