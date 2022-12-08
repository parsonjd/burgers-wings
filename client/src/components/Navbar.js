import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function Navbar() {
  function showNavigation() {
    return (
      <nav>
        <div className="nav-wrapper #4e342e brown darken-2">
          <ul className="flex-row" width="100%">
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
              <li>
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

  return <div>{showNavigation()};</div>;
}

export default Navbar;
