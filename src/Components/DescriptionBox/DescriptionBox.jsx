import React, { useState } from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  // const { product } = props;
  const [activeTab, setActiveTab] = useState("ProductDetails");

  // const [setRating] = useState(0); // Add state for toggling review form

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // const handleStarClick = (value) => {
  //   setRating(value);
  // };

  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div
          className={`descriptionbox-nav-box ${
            activeTab === "ProductDetails" ? "active" : ""
          }`}
          onClick={() => handleTabChange("ProductDetails")}
        >
          Delivery Details
        </div>

        <div
          className={`descriptionbox-nav-box ${
            activeTab === "Exchange" ? "active" : ""
          }`}
          onClick={() => handleTabChange("Exchange")}
        >
          7 Days Returns & Exchange
        </div>
      </div>
      <div className="descriptionbox-description">
        {activeTab === "ProductDetails" && (
          <div className="container">
            <h1 className="header">Free shipping</h1>
            <div className="">
              {/* <h2 className="">Free Shipping Information</h2> */}
              <div>
                <p className="paragraph">
                  <strong className="strong">Free Shipping:</strong> <br />
                  We offer free shipping across India.
                </p>
                <p className="paragraph">
                  <strong className="strong">1-2 Days Dispatch:</strong> <br />
                  We dispatch orders within 1-2 days.
                </p>
                <p className="paragraph">
                  <strong className="strong">2-5 Days Delivery:</strong> <br />
                  We usually take 2-5 working days depending on your location.
                  Metros usually receive orders within 2-3 days, while the rest
                  of India typically receives orders within 3-5 days.
                </p>
              </div>
            </div>
          </div>
        )}
        {activeTab === "Exchange" && (
          <div className="container">
            <h1 className="header">Return and Exchange Policy</h1>
            <p className="paragraph">
              Items purchased are eligible for return/exchange if returned
              within 7 days of delivery.
            </p>
            <h2 className="subtitle">Free Exchanges</h2>
            <p className="paragraph">
              We accept exchanges free of cost. This means you won't be charged
              extra to exchange the product(s). It's on us! We want your
              experience to be hassle-free.
            </p>
            <h2 className="subtitle">Easy Returns</h2>
            <p className="paragraph">
              <strong className="strong">For Prepaid Orders:</strong> The full
              amount is refunded into your initial payment mode (bank account,
              credit card, etc.).
            </p>
            <p className="paragraph">
              <strong className="strong">For Cash On Delivery:</strong> A refund
              will be initiated to the bank account that is provided by you at
              the time of raising a return.
            </p>
            <h2 className="subtitle">Exchange For Something Else?</h2>
            <p className="paragraph">
              In case of an exchange, you are also allowed to choose a different
              product. If the value of the replacement product exceeds that of
              the previously purchased product, you can pay just the difference,
              else if it's less, the same can be refunded to you as a gift card.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptionBox;
