import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";
import Body, { BodyProps } from "./body";
import Head, { HeadProps } from "./head";

export default abstract class Page {
  private head: HeadProps;
  private body: BodyProps;

  constructor(head: HeadProps, body: BodyProps) {
    this.head = head;
    this.body = body;
  }

  public compile = () => {
    const template = Handlebars.compile(
      fs.readFileSync(path.resolve(`./library/templates/base.html`), {
        encoding: "utf-8",
      })
    );
    return template({
      head: new Head(this.head).compile(),
      body: new Body(this.body).compile(),
    });
  };
}
