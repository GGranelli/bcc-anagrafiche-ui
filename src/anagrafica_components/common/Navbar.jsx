import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "./Constants";

import logoutImg from "../../img/logout.png";

function Navbar({ userType, username }) {
  if (
    window.location.pathname ===
    window.defConfigurations.url_prefix + ROUTES.LOGIN
  ) {
    return false;
  }
  return (
    <nav className="navbar navbar-light navBar">
      <div className="row col-md-12">
        <Link
          className={`nav-link col-md-2 noPadding navButton ${
            false ? "active" : ""
          }`}
          to={window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI}
        >
          Ricerca Cliente
        </Link>
        <Link
          className={`nav-link col-md-1 ml-2 navButton ${
            false ? "active" : ""
          }`}
          to={window.defConfigurations.url_prefix + ROUTES.REPORT}
        >
          Report
        </Link>
        <span className="navbar-brand ml-auto h1 col-md-2 text-right">
          <h4>{username ? username : localStorage.getItem("USERNAME")}</h4>
        </span>
        <Link
          className={`nav-link col-md-1 ml-2 navButton ${
            false ? "active" : ""
          }`}
          to={window.defConfigurations.url_prefix + ROUTES.LOGOUT}
        >
          <img className="logout-img" src={logoutImg} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
