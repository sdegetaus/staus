import Page from "../../library/page";
import * as fs from "fs";
import * as path from "path";
import { language } from "../l10n";

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
      language.es.messages
    );
  }
}

export default new Index();
