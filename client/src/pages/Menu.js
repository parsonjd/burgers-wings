import React from "react";
import { Link } from "react-router-dom";
import ItemList from "../components/ItemList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";
import Auth from "../utils/auth";

const Menu = () => (
  <div className="container">
    {Auth.loggedIn() ? null : (
      <div className="center-align">
        <Link className="brown-text" to="/login">
          ← Please log in to add items to cart.
        </Link>
      </div>
    )}
    <CategoryMenu />
    <ItemList />
    <Cart />
  </div>
);

export default Menu;
