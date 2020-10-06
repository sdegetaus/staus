import React from "react";

export default (props: Props) => {
  return (
    <body>
      {props.children}
      <script type="text/javascript" src="/main.js"></script>
    </body>
  );
};

type Props = {
  children?: JSX.Element;
};
