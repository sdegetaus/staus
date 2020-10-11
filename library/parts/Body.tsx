import React from "react";

export default ({ children, bodyScriptsName = null }: BodyProps) => {
  return (
    <body>
      {children}
      {bodyScriptsName !== null && (
        <script type="text/javascript" src={`/${bodyScriptsName}.js`}></script>
      )}
    </body>
  );
};

type BodyProps = {
  children?: JSX.Element;
  bodyScriptsName?: string;
};
