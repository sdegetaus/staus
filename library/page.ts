import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";

export default abstract class Page {
  private props: PageProps;
  private translations: { [key: string]: string };

  constructor(
    props: PageProps,
    translations: { [key: string]: string } // todo: should be ts type!
  ) {
    this.props = props;
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
      "head",
      fs.readFileSync(path.join(__dirname, `./templates/head.html`), {
        encoding: "utf-8",
      })
    );

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

    Handlebars.registerPartial("content", this.props.body.content);

    Handlebars.registerPartial(
      "footer",
      fs.readFileSync(path.resolve(`./src/layout/footer.html`), {
        encoding: "utf-8",
      })
    );

    const html = template({
      language: this.props.language,
      translations: this.translations,
    });

    // todo: unregister

    return html;
  };
}

type PageProps = {
  language?: string;
  head: {
    title?: string;
    description?: string;
  };
  body: {
    class?: string;
    content?: string;
  };
};
