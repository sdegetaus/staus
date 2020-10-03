import Page from "../../library/page";

class Index extends Page {
  constructor() {
    super(
      { title: "Home" },
      {
        content: `
        <h1>Home</h1>
        <a href="/about">About</a>
      `,
      }
    );
  }
}

export default new Index();
