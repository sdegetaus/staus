import Page from "../../library/page";

class About extends Page {
  constructor() {
    super(
      { title: "About" },
      {
        content: `
        <h1>About</h1>
        <a href="/">Home</a>
      `,
      }
    );
  }
}

export default new About();
