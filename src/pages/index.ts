import Page from "../../library/page";
import * as fs from "fs";
import * as path from "path";
import { translations } from "../l10n";

class Index extends Page {
  constructor() {
    super(
      {
        language: "es",
        title: "Home",
        description: "Home description",
        content: fs.readFileSync(path.join(__dirname, "/index.html"), {
          encoding: "utf-8",
        }),
      },
      translations.es.messages
    );
  }
}

export default new Index();
