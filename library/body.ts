import Part from "./part";

export default class Body extends Part<BodyProps> {
  constructor(props: BodyProps) {
    super("body.html", props);
  }
}

export type BodyProps = {
  class?: string;
  content?: string;
};
