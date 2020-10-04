import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";
import Body, { BodyProps } from "./body";
import Head, { HeadProps } from "./head";

export default abstract class Page {
  private props: PageProps;
  private head: HeadProps;
  private body: BodyProps;

  constructor(props: PageProps, head: HeadProps, body: BodyProps) {
    this.props = props;
    this.head = head;
    this.body = body;
  }

  public compile = () => {
    Handlebars.registerPartial(
      "layout",
      fs.readFileSync(path.resolve(`./src/layout/general.html`), {
        encoding: "utf-8",
      })
    );
    const template = Handlebars.compile(
      // use __dirname?
      fs.readFileSync(path.resolve(`./library/templates/base.html`), {
        encoding: "utf-8",
      })
    );
    return template({
      language: this.props.language,
      head: new Head(this.head).compile(),
      body: new Body(this.body).compile(),
    });
  };
}

type PageProps = {
  language?: string;
};
