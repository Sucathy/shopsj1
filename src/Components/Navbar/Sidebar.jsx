import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const sidebarRef = useRef();
  let [menu, setMenu] = useState("shop");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isOpen
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <ul>
        {/* <Route path="/menulist" element={<MenuPage />} /> */}
        {/* <MenuLists /> */}
        {/* <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            <button
              className="link-btn"
              onClick={() => console.log("Account clicked")}
            >
              profile
            </button>
          </li>
        </Link> */}
        <h3>category</h3>
        <ul>
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
              setMenu("mens");
            }}
          >
            <Link to="/mens" style={{ textDecoration: "none" }}>
              Men
            </Link>
            {menu === "mens" ? <hr /> : <></>}
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
        <hr />
        <h3>deatils</h3>
        <ul>
          <Link to="/account" style={{ textDecoration: "none" }}>
            <li>
              <button
                className="link-btn"
                onClick={() => console.log("Account clicked")}
              >
                Account
              </button>
            </li>
          </Link>
          <Link to="/order" style={{ textDecoration: "none" }}>
            <li>
              <button
                className="link-btn"
                onClick={() => console.log("Order clicked")}
              >
                Order
              </button>
            </li>
          </Link>
          <Link to="/address" style={{ textDecoration: "none" }}>
            <li>
              <button
                className="link-btn"
                onClick={() => console.log("Address clicked")}
              >
                Address
              </button>
            </li>
          </Link>
        </ul>
        {/* <Link to="/website" style={{ textDecoration: "none" }}>
          <li>
            <button
              className="link-btn"
              onClick={() => console.log("Contact clicked")}
            >
              Webiste
            </button>
          </li>
        </Link> */}
      </ul>
    </div>
  );
};

export default Sidebar;
