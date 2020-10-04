import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";
import Body, { BodyProps } from "./body";
import Head, { HeadProps } from "./head";

export default abstract class Page {
  private props: PageProps;
  private head: HeadProps;
  private body: BodyProps;
  private translations: { [key: string]: string };

  constructor(
    props: PageProps,
    head: HeadProps,
    body: BodyProps,
    translations: { [key: string]: string }
  ) {
    this.props = props;
    this.head = head;
    this.body = body;
    this.translations = translations;
  }

  // todo: make consts file for ids!

  public compile = () => {
    const template = Handlebars.compile(
      fs.readFileSync(path.join(__dirname, `./templates/base.html`), {
        encoding: "utf-8",
      })
    );

    Handlebars.registerHelper("translate", (s1: string) => {
      if (s1 == null) {
        return "NADA"; // todo: fallback
      }
      return s1.toUpperCase();
    });

    Handlebars.registerPartial(
      "body",
      fs.readFileSync(path.join(__dirname, `./templates/body.html`), {
        encoding: "utf-8",
      })
    );

    Handlebars.registerPartial(
      "layout",
      fs.readFileSync(path.resolve(`./src/layout/general.html`), {
        encoding: "utf-8",
      })
    );

    Handlebars.registerPartial(
      "header",
      fs.readFileSync(path.resolve(`./src/layout/header.html`), {
        encoding: "utf-8",
      })
    );

    Handlebars.registerPartial("content", this.body.content);

    Handlebars.registerPartial(
      "footer",
      fs.readFileSync(path.resolve(`./src/layout/footer.html`), {
        encoding: "utf-8",
      })
    );

    // Handlebars.createFrame(this.translations); // test

    return template({
      language: this.props.language,
      head: new Head(this.head).compile(),
      translations: this.translations,
    });
  };
}

type PageProps = {
  language?: string;
};
