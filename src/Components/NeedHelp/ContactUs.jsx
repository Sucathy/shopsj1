import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h1>Contact Us</h1>
      <section className="help-center">
        <h2>HELP CENTER</h2>
        <p>
          To submit return/exchange requests -{" "}
          <a href="https://www.example.com">Click here</a>
        </p>
        <p>
          For any other queries and Quicker Help, WhatsApp us -{" "}
          <a href="https://wa.me/916363203639">Click here</a>
        </p>
        <p>
          If the link doesn’t work, please WhatsApp us ‘Hi Nobero’ on{" "}
          <a href="tel:+916363203639">+91 6363203639</a> and we will get back to
          you within 24 hours.
        </p>
      </section>

      <section className="important-note">
        <h2>Important Note:</h2>
        <p>Dear Customer,</p>
        <p>
          In order to serve you faster & efficiently, the official support of
          Nobero has been shifted to WhatsApp only on the number -
          <a href="tel:+916363203639"> +91 6363203639</a>
        </p>
        <p>
          Please note, we DO NOT have ANY OTHER NUMBER for Call/WhatsApp as
          official support.
        </p>
        <p>
          Please beware, if you encounter any other contact
          number/WhatsApp/email online, it might be a scam. Nobero.com will
          never call you for password/OTP which may lead to financial fraud.
        </p>
        <p>
          For any help, feel free to reach out to us -{" "}
          <a href="https://chat.whatsapp.com/DLS6LXieTArKCTMJs1BM8Y">
            Click Here
          </a>
        </p>
      </section>
    </div>
  );
};

export default ContactUs;
