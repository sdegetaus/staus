import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as path from "path";
import Staus from "../";
import { ID } from "../consts";
import { MessagePair } from "../types";
import Layout from "./layout";

export default abstract class Page {
  constructor(private props: PageProps) {}

  public compile = (locale: string, messages: MessagePair) => {
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

    // register layout partials
    this.props.layout.registerPartials();

    // register "base" partials
    Handlebars.registerPartial(ID.content, this.getContent());

    const html = template({
      ...this.props,
      title: Staus.translate(this.props.title, locale),
      description: Staus.translate(this.props.description, locale),
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
  meta?: MetaPair[];
  bodyClass?: string;
  content: string;
  layout: Layout;
};

type MetaPair = {
  name: string;
  content: string;
};
