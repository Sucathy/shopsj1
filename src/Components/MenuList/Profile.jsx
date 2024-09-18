import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
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
        gender: data.gender || "Selecthere", // Default to 'male' if gender not provided
      });
    } catch (error) {
      console.error("Error fetching account details:", error.message);
      // Handle error: Display error message to the user or retry logic
    }
  };

  // const changeHandler = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

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
    } catch (error) {
      console.error("Error in handleSubmit:", error.message);
      showMessage("error", "Failed to update account details");
    }

    // Reset form data after submission
    setFormData({
      username: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "Selecthere", // Reset gender to default after submission
    });

    // Clear message after a delay
    setTimeout(() => {
      setMessage({
        type: "",
        text: "",
      });
    }, 5000); // Clear message after 5 seconds
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
        <div className="account_details">
          <form onSubmit={handleSubmit}>
            <h1>Account Details</h1>
            <hr />
            <br />
            <h3>First Name : {formData.username}</h3>
            <h3>Last Name : {formData.lastName}</h3>
            <h3>Email : {formData.email}</h3>
            <h3>Phone Number : {formData.phoneNumber}</h3>
            <h3>Gender : {formData.gender}</h3>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
