import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Account.css";
import MenuLists from "./MenuLists";

const Account = () => {
  const [formData, setFormData] = useState({
    username: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "Selecthere", // Default value for gender
  });

  const [message, setMessage] = useState({
    type: "",
    text: "",
  }); // State for success/error message

  const navigate = useNavigate(); // Initialize useNavigate hook

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
      setFormData({
        username: data.username,
        lastName: data.lastName,
        email: data.email || "", // Assuming email is returned as 'email' in response
        phoneNumber: data.phoneNumber,
        gender: data.gender || "Selecthere", // Default to 'Selecthere' if gender not provided
      });
    } catch (error) {
      console.error("Error fetching account details:", error.message);
      // Handle error: Display error message to the user or retry logic
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "", // Ensure authToken is defined and passed correctly
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update account details");
      }

      const data = await response.json();
      console.log("Account details updated successfully:", data);
      showMessage("success", "Account details updated successfully");

      // Fetch the updated account details immediately after a successful save
      fetchAccountDetails();

      // Navigate to the same page to reflect changes
      navigate("/account"); // Use replace: true to avoid adding a new entry to the history

      // Hide the message after 20 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 800);
    } catch (error) {
      console.error("Error in handleSubmit:", error.message);
      showMessage("error", "Failed to update account details");
    }
  };

  const showMessage = (type, text) => {
    setMessage({
      type: type,
      text: text,
    });
  };

  return (
    <div>
      <div className="popup-message">
        {message.type && <div className={message.type}>{message.text}</div>}
      </div>
      <div className="account-page">
        <MenuLists />
        <div className="account_details">
          <form onSubmit={handleSubmit}>
            <h2>Account Details</h2>
            <label>First Name:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
            <br />
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={changeHandler}
            />
            <br />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
            />
            <br />
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={changeHandler}
            />
            <br />
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={changeHandler}
            >
              <option value="Selecthere">Select here</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <br />
            <button className="button-btn" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
