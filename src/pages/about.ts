import Page from "../../library/page";

class About extends Page {
  constructor() {
    super(
      { language: "es" },
      { title: "About" },
      {
        content: `<h1>About</h1><a href="/">Home</a>`,
      },
      { test: "hello" }
    );
  }
}

export default new About();
