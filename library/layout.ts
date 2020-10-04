import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";

export default class Layout {
  private partials: string[];
  constructor(partials: string[]) {
    this.partials = partials;
  }

  public registerPartials = () => {
    this.partials.forEach((partial) => {
      Handlebars.registerPartial(
        partial,
        fs.readFileSync(path.resolve(`./src/layout/${partial}.html`), {
          encoding: "utf-8",
        })
      );
    });
  };

  public unregisterPartials = () => {
    this.partials.forEach((partial) => Handlebars.unregisterPartial(partial));
  };
}
