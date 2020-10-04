import Page from "../../library/page";

class Index extends Page {
  constructor() {
    super({
      title: "Home",
      description: "Home description",
      content: "./index.html",
    });
  }
}

export default new Index();
