import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuLists from "./MenuLists";
import "./OrderLists.css";

const OrderList = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between", // This pushes the 'View Details' text to the end
    alignItems: "center", // Align items vertically centered
    padding: "10px", // Optional padding around the container
  };

  const viewDetailsStyle = {
    fontSize: "20px",
    color: "black",
    cursor: "pointer",
    textDecoration: "underline", // Underline the text to make it look like a link
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://44.201.85.252/orderdetails`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token") || "",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.orders) {
          setOrders(data.orders);
          preloadImages(data.orders);
        } else {
          setError(data.message || "Failed to fetch orders");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const preloadImages = (orders) => {
      orders.forEach((order) => {
        order.products.forEach((product) => {
          const img = new Image();
          img.src = product.image;
        });
      });
    };

    fetchOrders();
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="order-list-page">
      <MenuLists />
      <div className="order-list-details">
        <form>
          <h1>Order List</h1>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul>
              {orders.map((order, index) => (
                <li key={index}>
                  <Link to={`/orderlistdetails/${order.orderId}`}>
                    <div className="order-products">
                      <div style={containerStyle}>
                        {order.products.length > 0 ? (
                          <>
                            <ul>
                              {order.products.map((product, idx) => (
                                <li key={idx}>
                                  <img
                                    src={product.image}
                                    alt={`Product ${product.productId}`}
                                    style={{
                                      width: "100%",
                                      maxWidth: "150px",
                                      height: "auto",
                                    }}
                                  />
                                </li>
                              ))}
                            </ul>
                            <p style={viewDetailsStyle}>View Details &gt;</p>
                          </>
                        ) : (
                          <p>No products found in this order.</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </div>
  );
};

export default OrderList;
