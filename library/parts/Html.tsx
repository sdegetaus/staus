import React from "react";

export default (props: Props) => {
  return <html lang={props.locale && props.locale}>{props.children}</html>;
};

type Props = {
  locale?: string;
  children: JSX.Element[];
};
