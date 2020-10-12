import React from "react";
import { Link } from "library";

export default () => {
  return (
    <footer>
      <div className="inner">
        <div className="meta">
          <span className="copy">
            &copy; {new Date().getFullYear()}{" "}
            <Link to="/" data="asd">
              Santiago Degetau
            </Link>{" "}
            &ndash; All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
};
