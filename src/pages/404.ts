import { Page } from "staus";
import { Main } from "../layouts";

class About extends Page {
  constructor() {
    super({
      title: "404.title",
      description: "404.description",
      content: "./404.html",
      layout: Main,
    });
  }
}

export default new About();
