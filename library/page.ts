import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";
import { ID } from "./consts";

export default abstract class Page {
  private props: PageProps;
  private translations: TranslationKey;

  constructor(props: PageProps, translations: TranslationKey) {
    this.props = props;
    this.translations = translations;
    console.log(this.translations);
  }

  public compile = () => {
    const template = Handlebars.compile(
      fs.readFileSync(path.join(__dirname, `./templates/base.html`), {
        encoding: "utf-8",
      })
    );

    // Handlebars.registerHelper("translate", (s1: string) => {
    //   if (s1 == null) {
    //     return "NADA"; // todo: fallback
    //   }
    //   return s1.toUpperCase();
    // });

    Handlebars.registerPartial(
      ID.head,
      fs.readFileSync(path.join(__dirname, `./templates/head.html`), {
        encoding: "utf-8",
      })
    );

    Handlebars.registerPartial(
      ID.body,
      fs.readFileSync(path.join(__dirname, `./templates/body.html`), {
        encoding: "utf-8",
      })
    );

    Handlebars.registerPartial(
      ID.layout,
      fs.readFileSync(path.resolve(`./src/layout/general.html`), {
        encoding: "utf-8",
      })
    );

    Handlebars.registerPartial(
      ID.header,
      fs.readFileSync(path.resolve(`./src/layout/header.html`), {
        encoding: "utf-8",
      })
    );

    Handlebars.registerPartial(ID.content, this.props.body.content);

    Handlebars.registerPartial(
      ID.footer,
      fs.readFileSync(path.resolve(`./src/layout/footer.html`), {
        encoding: "utf-8",
      })
    );

    const html = template({
      language: this.props.language,
      translations: this.translations,
    });

    // unregister all partials
    [ID.head, ID.body, ID.layout, ID.header, ID.content, ID.footer].forEach(
      (o) => {
        Handlebars.unregisterPartial(o);
      }
    );

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

// todo: change location
type TranslationKey = {
  [key: string]: string;
};

export type Translation = {
  [locale: string]: {
    messages: TranslationKey;
  };
};
