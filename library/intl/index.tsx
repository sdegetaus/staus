import React from "react";
import { MessagePair } from "../types";

class Intl extends React.Component<Props> {
  public static messages: MessagePair = null;

  // convert to high-order component:
  // https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775
  public static connectIntl = (messages: MessagePair) => {
    Intl.messages = messages;
  };

  resolveTranslation = () => {
    const res = Intl.messages[this.props.id];
    return res == null ? this.props.id : res;
  };

  render() {
    return <>{this.resolveTranslation()}</>;
  }
}
export default Intl;

interface Props {
  id: string;
}
