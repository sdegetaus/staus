import { Page } from "staus";
import { Main } from "../layouts";

class Index extends Page {
  constructor() {
    super({
      title: "home.title",
      description: "home.description",
      content: "./index.html",
      layout: Main,
    });
  }
}

export default new Index();
