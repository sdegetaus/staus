import { Page } from "staus";
import { MainLayout } from "../layout";

class About extends Page {
  constructor() {
    super({
      title: "404",
      description: "Page not found!",
      content: "./404.html",
      layout: MainLayout,
    });
  }
}

export default new About();
