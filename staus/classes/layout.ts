import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";

export default class Layout {
  constructor(private partials: string[]) {}

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
