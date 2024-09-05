import React, { useState } from "react";
import { Link } from "react-router-dom";
import account_icon from "../Assets/account_icon1.svg";
import address_icon from "../Assets/address_icon1.svg";
import order_icon from "../Assets/order_icon1.svg";
import "./MenuLists.css";
const MenuLists = () => {
  const [activeSection, setActiveSection] = useState("");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="menu-page">
      <div className="menu-listcard">
        <Link to="/account" onClick={() => handleSectionClick("Account")}>
          <img src={account_icon} alt="" />
          Account
        </Link>
        <hr className="hrrr" />
        <Link to="/order" onClick={() => handleSectionClick("Order")}>
          <img src={order_icon} alt="" />
          Order
        </Link>
        <hr className="hrrr" />
        <Link to="/address" onClick={() => handleSectionClick("Address")}>
          <img src={address_icon} alt="" />
          Address
        </Link>
      </div>

      <div className="card-container">
        {activeSection === "Account"}
        {activeSection === "Order"}
        {activeSection === "Address"}
      </div>
    </div>
  );
};

export default MenuLists;
