import React from "react";
import ReactDOMServer from "react-dom/server";
import { MessagePair } from "../types";
import { Body, Head, Html } from "./Parts";

export default abstract class Page {
  constructor(private props: PageProps) {}

  abstract render(): React.ReactElement;

  public compile = (locale: string, messages: MessagePair): string => {
    return ReactDOMServer.renderToStaticMarkup(
      <Html locale={locale}>
        <Head></Head>
        <Body>{this.render()}</Body>
      </Html>
    );
  };
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
