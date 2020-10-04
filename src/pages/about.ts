import Page from "../../library/page";
import layout from "../index";

class About extends Page {
  constructor() {
    super({
      title: "About",
      description: "About description",
      content: "./about.html",
      layout,
    });
  }
}

export default new About();
