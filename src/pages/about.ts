import Page from "../../library/page";

class About extends Page {
  constructor() {
    super({
      title: "About",
      description: "About description",
      content: "./about.html",
    });
  }
}

export default new About();
