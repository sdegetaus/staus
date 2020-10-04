import Page from "../../library/page";
import layout from "../index";

class Index extends Page {
  constructor() {
    super({
      title: "Home",
      description: "Home description",
      content: "./index.html",
      layout,
    });
  }
}

export default new Index();
