import Page from "../../library/page";
import layout from "../index";

import Layout from "../../library/layout";

class About extends Page {
  constructor() {
    const l = new Layout(["main", "header"]);
    super({
      title: "About",
      description: "About description",
      content: "./about.html",
      layout: l,
    });
  }
}

export default new About();
