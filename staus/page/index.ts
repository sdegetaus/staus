import React from "react";
import ReactDOMServer from "react-dom/server";
import { MessagePair } from "../types";
import Body from "./Parts/Body";
import Head from "./Parts/Head";
import Html from "./Parts/Html";

export default abstract class Page {
  constructor(private props: PageProps) {}

  abstract render(): React.ReactElement;

  public compile = (locale: string, messages: MessagePair): string => {
    return ReactDOMServer.renderToStaticMarkup(
      Html({ locale, head: Head({}), body: Body({ children: this.render() }) })
    );
  };

  // TODO: clean me up!

  // public compile = (locale: string, messages: MessagePair) => {
  //   this.locale = locale;

  //   const template = Handlebars.compile(
  //     fs.readFileSync(
  //       path.join(Staus.PATH.STAUS_DIR, `./templates/base.html`),
  //       {
  //         encoding: "utf-8",
  //       }
  //     )
  //   );

  //   this.registerAll();

  //   const html = template({
  //     ...this.props,
  //     title: Staus.translate(this.props.title, locale),
  //     description: Staus.translate(this.props.description, locale),
  //     messages,
  //     locale,
  //     defaultLanguage: Staus.CONFIG.defaultLanguage,
  //   });

  //   this.unregisterAll();

  //   return html;
  // };

  /*
  private registerAll = () => {
    // register helpers
    Handlebars.registerHelper(ID.link, (options, _options) => {
      // todo: clean up
      // todo: can attrs content be translated?
      const { href, ...attrs } = options.hash;
      const htmlAttrs = Object.entries(attrs).map(([k, i]) => `${k}="${i}"`); // convert to html
      const hrefWithoutSlash =
        href && href[0] === "/" ? href.substring(1) : href;
      const localizedHref =
        this.locale === Staus.CONFIG.defaultLanguage
          ? hrefWithoutSlash
          : `${this.locale}/${hrefWithoutSlash}`;
      return new Handlebars.SafeString(
        `<a ${
          localizedHref != null ? `href="/${localizedHref}"` : `` // handle `undefined` href
        } ${htmlAttrs.join(" ")}>${options.fn(this)}</a>`
      );
    });

    // register layout partials
    this.props.layout.registerPartials();

    // register the content partial
    Handlebars.registerPartial(ID.content, this.getContent());

    // register "base" partials
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
  };

  private unregisterAll = () => {
    // unregister block helpers
    [ID.link].forEach((o) => Handlebars.unregisterHelper(o));
    // unregister layout partials
    this.props.layout.unregisterPartials();
    // unregister "base" partials
    [ID.head, ID.body, ID.content].forEach((o) =>
      Handlebars.unregisterPartial(o)
    );
  };
  */
}

type PageProps = {
  title?: string;
  description?: string;
  meta?: MetaPair[];
  bodyClass?: string;
};

type MetaPair = {
  name: string;
  content: string;
};

export { Body, Head, Html };
