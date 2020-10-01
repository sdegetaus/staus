import Page from "../../library/page";

class Index extends Page {
  constructor() {
    super(
      { title: "The Title", description: "My description" },
      `<a href="/about">About</a>`
    );
  }
}

export default new Index();
