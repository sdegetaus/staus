import Part from "./part";

export default class Head extends Part<HeadProps> {
  constructor(props: HeadProps) {
    super("head.html", props);
  }
}




export type HeadProps = {
  title?: string;
  description?: string;
};
