import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Account.css";
import MenuLists from "./MenuLists";

const Address = () => {
  const initialFormData = {
    username: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    flatHouse: "",
    fullAddress: "",
    pinCode: "",
    state: "",
    city: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [addresses, setAddresses] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });

  const messageTimeoutRef = useRef(null); // Ref for message timeout

  useEffect(() => {
    fetchAccountDetails();

    return () => {
      // Clean up timeout on component unmount
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const fetchAccountDetails = async () => {
    try {
      const response = await fetch("http://44.201.85.252/accountdetails", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch account details");
      }

      const data = await response.json();
      setAddresses(data.addresses);
      setFormData({
        username: data.username,
        lastName: data.lastName,
        email: data.email || "",
        phoneNumber: data.phoneNumber,
        flatHouse: data.flatHouse,
        fullAddress: data.fullAddress,
        pinCode: data.pinCode,
        state: data.state,
        city: data.city,
      });
    } catch (error) {
      console.error("Error fetching account details:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    setAddresses([...addresses, formData]);
    showMessage("success", "Address added successfully");
    setFormData(initialFormData); // Clear form data after adding address
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });

    // Clear any existing timeout before setting a new one
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    // Set a new timeout to clear the message after 3 seconds
    messageTimeoutRef.current = setTimeout(() => {
      setMessage({ type: "", text: "" });
    }, 3000);
  };

  return (
    <div className="address-page">
      <MenuLists />
      <div className="address_details">
        <form onSubmit={handleAddAddress} className="saved-addresses">
          <h1>Addresses Details</h1>
          {addresses.map((address, index) => (
            <div key={index} className="addressesss">
              <p>
                <strong>
                  {address.username} {address.lastName}
                </strong>
              </p>
              <p>{address.fullAddress}</p>
              <p>
                {address.city}, {address.state} - {address.pinCode}
              </p>
              <p>Phone: {address.phoneNumber}</p>
              <hr />
            </div>
          ))}

          <Link to="/newaddaddress">
            <button
              className="button-btn"
              type="submit"
              onChange={handleChange} // This is not needed as onChange is handled on inputs
            >
              Add and Edit Address
            </button>
          </Link>
          {message.text && (
            <p className={`message ${message.type}`}>{message.text}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Address;
