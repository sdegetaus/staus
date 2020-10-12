import React from "react";
import Menu from "./Menu";

export default (props: HeaderProps) => {
  return (
    <header>
      <div className="inner">
        <div className="logo">
          <a href="/">
            Taus<span>MX</span>
          </a>
        </div>
        <Menu {...props} />
      </div>
    </header>
  );
};

interface HeaderProps {
  pageId: string;
  locale: string;
}
