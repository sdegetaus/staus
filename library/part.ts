import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";

export default abstract class Part<T> {
  private htmlTemplate: string = null;
  private props: T = null;

  constructor(templatestPath: string, props: T) {
    this.htmlTemplate = path.resolve(`./library/templates/${templatestPath}`);
    this.props = props;
  }

  public compile = (): string => {
    const template = Handlebars.compile(
      fs.readFileSync(this.htmlTemplate, { encoding: "utf-8" })
    );
    return template(this.props).trim();
  };
}
