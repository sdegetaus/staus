import { IntlMessage, Link } from "library";
import React from "react";
import { routes } from "../routes";

const lang = ["en", "es"];

const activeStyle = {
  backgroundColor: "red",
};

export default (props: MenuProps) => {
  return (
    <nav className="menu">
      <ul>
        {Object.keys(routes).map((o) => (
          <li key={o} style={o === props.pageId ? activeStyle : {}}>
            <Link to={routes[o].slug[props.locale]}>
              <IntlMessage id={routes[o].title} />
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {lang.map((o) => (
          <li key={o}>
            <Link to={`/${o !== "en" ? o : ""}`}>{o.toUpperCase()}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

interface MenuProps {
  pageId: string;
  locale: string;
}
