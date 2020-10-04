import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";
import Staus from "../";
import { ID } from "../consts";
import { LanguageKey } from "../types";
import Layout from "./layout";

export default abstract class Page {
  constructor(private props: PageProps) {}

  public compile = (locale: string, messages: LanguageKey) => {
    const template = Handlebars.compile(
      fs.readFileSync(
        path.join(Staus.PATH.STAUS_DIR, `./templates/base.html`),
        {
          encoding: "utf-8",
        }
      )
    );

    Handlebars.registerHelper("link", (context, options) => {
      // console.log(context, options);
      return new Handlebars.SafeString(`<a>${context.fn(this).trim()}</a>`);
    });

    Handlebars.registerPartial(
      ID.head,
      fs.readFileSync(
        path.join(Staus.PATH.STAUS_DIR, `./templates/head.html`),
        {
          encoding: "utf-8",
        }
      )
    );

    Handlebars.registerPartial(
      ID.body,
      fs.readFileSync(
        path.join(Staus.PATH.STAUS_DIR, `./templates/body.html`),
        {
          encoding: "utf-8",
        }
      )
    );

    this.props.layout.registerPartials();

    Handlebars.registerPartial(ID.content, this.getContent());

    // TODO: translate title and description!
    const html = template({
      ...this.props,
      messages,
      locale,
      defaultLanguage: Staus.CONFIG.defaultLanguage,
    });

    // unregister layout partials
    this.props.layout.unregisterPartials();

    // unregister "base" partials
    [ID.head, ID.body, ID.content].forEach((o) => {
      Handlebars.unregisterPartial(o);
    });

    return html;
  };

  // TODO: maybe move to utils and purify it
  // if finds path, return file content, else return the content
  private getContent = (): string => {
    try {
      return fs.readFileSync(
        path.join(Staus.PATH.PAGES_DIR, `/${this.props.content}`),
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
