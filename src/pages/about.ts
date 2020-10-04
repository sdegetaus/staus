import Page from "../../library/page";
import { language } from "../l10n/index";

class About extends Page {
  constructor() {
    super(
      {
        title: "About",
        description: "Home description",
        language: "es",
        content: `<h1>About</h1><a href="/">Home</a>`,
      },
      language.es.messages
    );
  }
}

export default new About();
