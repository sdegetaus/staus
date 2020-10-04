import Page from "../../library/page";
import { translations } from "../l10n/index";

class About extends Page {
  constructor() {
    super(
      {
        language: "es",
        head: {
          title: "Home",
          description: "Home description",
        },
        body: {
          content: `<h1>About</h1><a href="/">Home</a>`,
        },
      },
      translations.es.messages
    );
  }
}

export default new About();
