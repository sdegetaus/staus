import Page from "../../library/page";
import { MainLayout } from "../index";

class Index extends Page {
  constructor() {
    super({
      title: "Home",
      description: "Home description",
      content: "./index.html",
      layout: MainLayout,
    });
  }
}

export default new Index();
