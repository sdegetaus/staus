import Page from "../../library/page";
import * as fs from "fs";
import * as path from "path";

class Index extends Page {
  constructor() {
    super(
      {
        language: "es",
        head: {
          title: "Home",
          description: "Home description",
        },
        body: {
          content: fs.readFileSync(path.join(__dirname, "/index.html"), {
            encoding: "utf-8",
          }),
        },
      },
      { test: "can be translated!" }
    );
  }
}

export default new Index();
