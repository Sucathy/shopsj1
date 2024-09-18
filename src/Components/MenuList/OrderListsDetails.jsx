import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuLists from "./MenuLists";
import "./OrderListsDetails.css";
import Tracking from "./Tracking";
const OrderListsDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/orderdetails/${orderId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("auth-token") || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setOrder(data.order);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-list-page">
      <MenuLists />
      <div className="order-list-details">
        <h1>Order Details</h1>
        <div className="productdetails">
          <h5>Order Number : {order.orderId}</h5>
          <h5>Order Date : {order.orderDate}</h5>
        </div>
        <div className="productimagedetailsss">
          {order.products.map((product, idx) => (
            <>
              <li key={idx}>
                <img
                  src={product.image}
                  alt={`Product ${product.productId}`}
                  style={{ width: "150px", height: "150px" }}
                />
                <h3>
                  Price : ₹{order.amount / 100} {order.paymentStatus}
                </h3>
                <br />

                <h3>Quantity : {product.quantity}</h3>
              </li>
            </>
          ))}
        </div>

        <div className="shippingAdressdetails">
          <h2>Shipping Address : </h2>
          <h3>
            {/* {order.orderStatus?.likeOrder}
            {order.orderStatus?.status42}
            {order.orderStatus?.orderCameActive} */}
            {order.orderStatus?.deliveryOrder}
            {order.shipping_address?.username}{" "}
            {order.shipping_address?.lastName} {" | "}
            {order.shipping_address?.phoneNumber}
          </h3>
          <p>
            {order.shipping_address?.fullAddress}{" "}
            {order.shipping_address?.pinCode} {order.shipping_address?.state}{" "}
            {order.shipping_address?.city}
          </p>
          <div>
            <Tracking />
            {/* <Trackingline /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderListsDetails;
