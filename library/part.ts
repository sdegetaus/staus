import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";

export default abstract class Part<T> {
  private templatePath: string = null;
  protected props: T = null;

  constructor(templatePath: string, props: T) {
    this.templatePath = path.resolve(`./library/templates/${templatePath}`);
    this.props = props;
  }

  public compile = (): string => {
    const template = Handlebars.compile(
      fs.readFileSync(this.templatePath, { encoding: "utf-8" })
    );
    return template(this.props).trim();
  };
}
