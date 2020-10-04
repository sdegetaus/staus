import Page from "../../library/page";

class About extends Page {
  constructor() {
    super(
      {
        language: "es",
        head: {
          title: "Home",
          description: "Home description",
        },
        body: {
          content: `<h1>About</h1><a href="/">Home</a>`,
        },
      },
      { test: "Acerca" }
    );
  }
}

export default new About();
