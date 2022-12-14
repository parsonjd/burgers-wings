import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function Navbar() {
  function showNavigation() {
    return (
      <nav>
        <div className="nav-wrapper #ff9100 orange accent-3">
          <ul className="flex-row nav-links brown-text" width="100%">
            <li>
              <Link to="/">HOME</Link>
            </li>

            {Auth.loggedIn() ? (
              <li>
                <a href="/" onClick={() => Auth.logout()}>
                  LOGOUT
                </a>
              </li>
            ) : (
              <li>
                <Link to="/login">LOGIN</Link>
              </li>
            )}

            {Auth.loggedIn() ? (
              <li className="remove">
                <Link to="/orderHistory">ORDER HISTORY</Link>
              </li>
            ) : (
              <li>
                <Link to="/signup">SIGNUP</Link>
              </li>
            )}
            <li>
              <Link to="/Menu">MENU</Link>
            </li>

            <li>
              <Link to="/contact">CONTACT US</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <div>
      <header>
        <h1 className="center-align title">Burger & Wings Ville</h1>
      </header>
      <nav>{showNavigation()}</nav>
    </div>
  );
}

export default Navbar;
