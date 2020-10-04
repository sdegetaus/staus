import { Page } from "../../staus";
import { MainLayout } from "../layout";

class About extends Page {
  constructor() {
    super({
      title: "About",
      description: "About description",
      content: "./about.html",
      layout: MainLayout,
    });
  }
}

export default new About();
