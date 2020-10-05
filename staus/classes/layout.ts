import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";

export default class Layout {
  constructor(private partials: string[]) {}

  public registerPartials = () => {
    this.partials.forEach((partial) => {
      const extension = path.extname(partial);
      const filename = path.basename(partial, extension);
      Handlebars.registerPartial(
        partial,
        fs.readFileSync(path.resolve(`./src/layout/${filename}.html`), {
          encoding: "utf-8",
        })
      );
    });
  };

  public unregisterPartials = () => {
    this.partials.forEach((partial) => Handlebars.unregisterPartial(partial));
  };
}
