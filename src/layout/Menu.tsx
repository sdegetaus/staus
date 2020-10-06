import React from "react";
import { Link } from "library";

const items = [
  {
    href: "/",
    title: "Home",
  },
  {
    href: "/about",
    title: "About",
  },
];

const lang = ["en", "es"];

export default () => {
  return (
    <nav className="menu">
      <ul>
        {items.map((o) => (
          <li key={o.title}>
            <Link to={o.href}>{o.title}</Link>
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
