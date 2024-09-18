import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CheckoutList = ({ onSelectAddress }) => {
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
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  const fetchAccountDetails = async () => {
    try {
      const response = await fetch("http://localhost:4000/accountdetails", {
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

  const handleSelectAddress = (index) => {
    setSelectedAddressIndex(index);
    onSelectAddress(addresses[index]); // Notify parent component of selected address
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    setAddresses([...addresses, formData]);
    setFormData(initialFormData); // Clear form data after adding address
  };

  return (
    <form onSubmit={handleAddAddress} className="saved-addresses">
      <h3>
        Hey! Welcome back {formData.username} {formData.lastName}
      </h3>
      <br />
      <h4>Shipping Address</h4>
      <br />

      {addresses.map((address, index) => (
        <div
          key={index}
          className={`addressesss ${
            selectedAddressIndex === index ? "selected" : ""
          }`}
          onClick={() => handleSelectAddress(index)}
        >
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

      <button
        className="button-btn"
        type="button"
        disabled={selectedAddressIndex === null}
      >
        Select The Address
      </button>
      <Link to="/newaddaddress">
        <button className="button-btn">Add & Edit the Address</button>
      </Link>
      <hr />
    </form>
  );
};

export default CheckoutList;
