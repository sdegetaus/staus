import Page from "../../library/page";

class About extends Page {
  constructor() {
    super({ title: "About" }, `<a href="/">Home</a>`);
  }
}

export default new About();
