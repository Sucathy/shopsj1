import React from "react";
import "./ShippingPolicy.css";

const ShippingPolicy = () => {
  return (
    <div className="shipping-policy-container">
      <h1>Shipping Policy</h1>

      <section className="shipping-section">
        <h2>Shipping Rates</h2>
        <p>
          • We offer free shipping across India for all prepaid orders. For COD
          orders, an additional fee is applicable for "cash handling" by the
          carrier partner.
        </p>
      </section>

      <section className="shipping-section">
        <h2>Order Processing</h2>
        <p>
          • We strive to fulfill orders as soon as you place them. In most
          cases, your order will be dispatched within 1-2 business days.
        </p>
      </section>

      <section className="shipping-section">
        <h2>Delivery Time</h2>
        <p>
          • We usually take 2-5 working days, depending on your location. Metros
          2-3 days and the Rest of India 3-5 days. However, you can track your
          package using a unique tracking link, which we will email/SMS you
          after your order is sent to our delivery partner.
        </p>
      </section>

      <section className="shipping-section">
        <h2>Order Tracking</h2>
        <p>
          • You'll receive a tracking number from us in your inbox as soon as it
          ships! Orders can be tracked in real-time via this link -{" "}
          <a href="https://www.example.com">Track Order</a>
        </p>
      </section>
    </div>
  );
};

export default ShippingPolicy;
