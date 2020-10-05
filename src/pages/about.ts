import { Page } from "staus";
import { Main } from "../layouts";

class About extends Page {
  constructor() {
    super({
      title: "about.title",
      description: "about.description",
      content: "./about.html",
      layout: Main,
    });
  }
}

export default new About();
