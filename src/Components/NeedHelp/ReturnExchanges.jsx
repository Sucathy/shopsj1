import React from "react";
import "./ReturnExchange.css"; // Create a CSS file for styles

const ReturnExchanges = () => {
  return (
    <div className="return-exchange-container">
      <h1>Shipping & Returns</h1>

      <section className="return-exchange-section">
        <h2>Return/Exchange</h2>
        <p>Track Order</p>
        <h3>Return & Exchange</h3>
      </section>

      <section className="policy-section">
        <h2>7-Day Returns & Exchanges</h2>
        <p>
          Items purchased from ShopNJ are eligible for return/exchange, if
          returned within 7 days of delivery.
        </p>

        <h3>Free Exchanges</h3>
        <p>
          We accept exchanges free of cost. This means you won't be charged
          extra to exchange the product(s). It's on us! We want your experience
          to be hassle-free.
        </p>

        <h3>Easy Returns</h3>
        <p>
          <strong>For Prepaid Orders:</strong> Your entire amount will be
          promptly refunded to your original payment mode, whether it's your
          bank account or credit card or any other mode of payment.
        </p>
        <p>
          <strong>For Cash On Delivery:</strong> A refund will be initiated to
          the bank account that is provided by you at the time of raising a
          return.
        </p>

        <h3>Exchange For Something Else</h3>
        <p>
          In case of an exchange, you are also allowed to choose a different
          product. If the value of the replacement product exceeds that of the
          previously purchased product, you can pay just the difference. If it's
          less, the same can be refunded to you as a gift card.
        </p>
      </section>

      <section className="request-section">
        <h3>For Returns & Exchanges, you can raise the request here:</h3>
        <ul>
          <li>
            Once your return request is verified by our support team, reverse
            pickup will be initiated from our end, and once they are picked up,
            the refund/exchange will be provided.
          </li>
          <li>Exchange is purely subject to product availability.</li>
          <li>
            If you have received a defective product, send us images using our
            return center, and we will get back to you. Once they are verified
            by our support team, the refund/exchange will be provided.
          </li>
          <li>
            In the interests of hygiene, we may refuse returns where it's
            obvious that the item has been worn, washed, or soiled.
          </li>
          <li>
            If the reverse pick-up service to your address Pincode is not
            available, we would ask you to process the
            Self-Shipping/Self-Courier to return us the product.
          </li>
          <li>
            Refunds/Exchanges are not applicable on highly discounted products.
          </li>
          <li>
            A refund will be initiated as soon as the returned item reaches our
            warehouse and passes the quality inspection. It should take place
            within the following 5-7 business days.
          </li>
        </ul>
      </section>

      <section className="self-ship-section">
        <h3>Self Ship Process</h3>
        <p>
          Please pack the items securely to prevent any loss or damage during
          transit. All items must be in unused condition with all original tags
          attached and packaging intact.
        </p>
        <p>You can courier the product(s) to the address mentioned below:</p>
        <p>
          <strong>
            ShopNj, 10th Main water tank BTM Bengaluru, Karnataka, India, pin
            code = 560029
          </strong>
        </p>
        <p>
          Upon receiving the product at the warehouse, We will inform you
          through an email alert or with a voice call.
        </p>
        <p>
          Please ensure the items are packed securely to prevent any loss or
          damage during transit and the ORDER ID and registered mobile number is
          mentioned on the packaging. All items must be in unused condition with
          all original tags attached and packaging intact. Within 48 hours of
          receiving the product(s), the complete amount + INR 100 (in lieu of
          courier charges) will be refunded to your bank account.
        </p>
      </section>

      <section className="faq-section">
        <h3>I haven't received my refund yet. What should I do?</h3>
        <ul>
          <li>
            We update our customers via email once we initiate the refund
            procedure.
          </li>
          <li>Bank refunds for prepaid orders will take 7-10 business days.</li>
          <li>
            For any further clarification, please reach our help center and
            provide the required details to raise a ticket to help sort things
            out.
          </li>
        </ul>
      </section>
    </div>
  );
};

export default ReturnExchanges;
