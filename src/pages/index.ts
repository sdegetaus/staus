import { Page } from "../../staus";
import { MainLayout } from "../layout";

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
