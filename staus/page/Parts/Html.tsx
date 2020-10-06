import React from "react";

export default (props: Props) => {
  return (
    <html lang={props.locale && props.locale}>
      {props.head}
      {props.body}
    </html>
  );
};

type Props = {
  locale?: string;
  head?: JSX.Element;
  body?: JSX.Element;
};
