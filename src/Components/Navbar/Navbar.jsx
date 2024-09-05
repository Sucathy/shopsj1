import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import cart_icon from "../Assets/cart_icon.png";
import logo from "../Assets/logo2.jpeg";
import menu_icon from "../Assets/menuicon2.svg";
import OfferZone from "../OfferZone/OfferZone";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  let [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  // const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef();

  // const dropdown_toggle = (e) => {
  //   menuRef.current.classList.toggle("nav-menu-visible");
  //   e.target.classList.toggle("open");
  // };

  // const handleInputChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };
  // const handleSearch = () => {
  //   // Implement your search logic here, e.g., redirect to a search results page
  //   console.log("Searching for:", searchQuery);
  //   setMenu("/search-results"); // Update menu state based on search action
  // };

  return (
    <>
      <div className="nav">
        <button className="menu-btn" onClick={toggleSidebar}>
          <img className="menu-btnicon" src={menu_icon} alt="" />
        </button>

        <Link
          to="/"
          onClick={() => {
            setMenu("shop");
          }}
          style={{ textDecoration: "none" }}
          className="nav-logo"
        >
          <img src={logo} alt="logo" />
          {/* <p>ShopSJ</p> */}
        </Link>
        {/* <img
          onClick={dropdown_toggle}
          className="nav-dropdown"
          src={nav_dropdown}
          alt=""
        /> */}

        <ul ref={menuRef} className="nav-menu">
          <li
            onClick={() => {
              setMenu("shop");
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              Shop
            </Link>
            {menu === "shop" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("/Men");
            }}
          >
            <Link to="/Mens" style={{ textDecoration: "none" }}>
              Men
            </Link>
            {menu === "/Men" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("womens");
            }}
          >
            <Link to="/womens" style={{ textDecoration: "none" }}>
              Women
            </Link>
            {menu === "womens" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("kids");
            }}
          >
            <Link to="/kids" style={{ textDecoration: "none" }}>
              Kids
            </Link>
            {menu === "kids" ? <hr /> : <></>}
          </li>
          <li
            onClick={() => {
              setMenu("/NewCollection");
            }}
          >
            <Link to="/NewCollections" style={{ textDecoration: "none" }}>
              New Collection
            </Link>
            {menu === "/NewCollection" ? <hr /> : <></>}
          </li>
        </ul>
        {/* <div
        className="search-btn"
        style={{ display: "flex", alignItems: "right" }}
      >
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
          style={{ marginRight: "8px" }} // Adjust spacing as needed
        />
        <button onClick={handleSearch}>Search</button>
        {menu === "/search-results" ? (
          <hr style={{ marginLeft: "8px" }} />
        ) : null}
      </div> */}
        <div className="nav-login-cart">
          {localStorage.getItem("auth-token") ? (
            <button
              onClick={() => {
                localStorage.removeItem("auth-token");
                window.location.replace("/");
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button>Login</button>
            </Link>
          )}
          <Link to="/cart">
            <img src={cart_icon} alt="cart" />
          </Link>
          <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
      </div>
      <OfferZone />
    </>
  );
};

export default Navbar;
