import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";
import { ID, PATH } from "./consts";

export default abstract class Page {
  private props: PageProps;
  private translations: LanguageKey;

  constructor(props: PageProps, translations: LanguageKey) {
    this.props = props;
    this.translations = translations;
  }

  public compile = () => {
    const template = Handlebars.compile(
      fs.readFileSync(path.join(__dirname, `./templates/base.html`), {
        encoding: "utf-8",
      })
    );

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

    Handlebars.registerPartial(ID.content, this.getContent());

    Handlebars.registerPartial(
      ID.footer,
      fs.readFileSync(path.resolve(`./src/layout/footer.html`), {
        encoding: "utf-8",
      })
    );

    const html = template({
      ...this.props,
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

  // TODO: maybe move to utils and purify it
  private getContent = (): string => {
    try {
      return fs.readFileSync(
        path.join(PATH.PAGES_DIR, `/${this.props.content}`),
        { encoding: "utf-8" }
      );
    } catch (e) {
      return this.props.content;
    }
  };
}

type PageProps = {
  language?: string;
  title?: string;
  description?: string;
  bodyClass?: string;
  content: string;
};

// todo: change location
type LanguageKey = {
  [key: string]: string;
};

export type Language = {
  [locale: string]: {
    messages: LanguageKey;
  };
};
