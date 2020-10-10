import React from "react";

export default (props: BodyProps) => {
  return <body>{props.children}</body>;
};

type BodyProps = {
  children?: JSX.Element;
};
