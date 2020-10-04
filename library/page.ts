import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";
import { ID, PATH } from "./consts";
import * as config from "../config.json";
import Layout from "./layout";

export default abstract class Page {
  private props: PageProps;

  constructor(props: PageProps) {
    this.props = props;
  }

  public compile = (locale: string, messages: LanguageKey) => {
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

    this.props.layout.registerPartials();

    Handlebars.registerPartial(ID.content, this.getContent());

    const html = template({
      ...this.props,
      messages,
      locale,
      defaultLanguage: config.defaultLanguage,
    });

    // unregister all partials
    [ID.head, ID.body, ID.content].forEach((o) => {
      Handlebars.unregisterPartial(o);
    });
    this.props.layout.unregisterPartials();

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
  title?: string;
  description?: string;
  bodyClass?: string;
  content: string;
  layout: Layout;
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
