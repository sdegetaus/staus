import React from "react";
import Menu from "./Menu";

export default () => {
  return (
    <header>
      <div className="inner">
        <div className="logo">
          <a href="/">
            Taus<span>MX</span>
          </a>
        </div>
        <Menu />
      </div>
    </header>
  );
};
