import React from "react";
import { IntlData, MessagePair } from "../types";

// TODO: clean up
class Intl extends React.Component<Props, State> {
  public static messages: MessagePair = null;
  public static injectIntl = (messages: MessagePair) => {
    Intl.messages = messages;
  };
  test = () => {
    console.log("inject");
    const res = Intl.messages[this.props.id];
    return res == null ? this.props.id : res;
  };
  render() {
    return <>{this.test()}</>;
  }
}
export default Intl;

interface Props {
  id: string;
}

interface State {}
