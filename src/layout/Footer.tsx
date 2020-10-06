import React from "react";
import { Link } from "library";

export default () => {
  return (
    <footer>
      <div className="inner">
        &copy; 2020{" "}
        <Link to="/" data="asd">
          Santiago Degetau
        </Link>{" "}
        &ndash; All rights reserved
      </div>
    </footer>
  );
};
