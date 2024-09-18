import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import cross_icon from "../Assets/cart_cross_icon.png";
import CheckoutList from "../Checkout/CheckoutList";
import "./CartItems.css";

const CartItems = () => {
  const {
    products,
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    addToCart,
    clearCart,
  } = useContext(ShopContext);

  const [totalCartAmount, setTotalCartAmount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    // Load cart items from localStorage
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    // Assuming there's a method to set cartItems in the ShopContext
    if (savedCartItems) {
      // If using a method to set cart items in context, call it here
      // Example: setCartItems(savedCartItems);
    }
  }, []);

  useEffect(() => {
    setTotalCartAmount(getTotalCartAmount());
    // Save cart items to localStorage whenever cartItems change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems, getTotalCartAmount]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const increaseQuantity = (productId) => {
    addToCart(productId);
  };

  const decreaseQuantity = (productId) => {
    if (cartItems[productId] > 1) {
      removeFromCart(productId);
    }
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!selectedAddress) {
      alert("Please select a shipping address.");
      return;
    }

    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      alert(
        "Failed to load Razorpay SDK. Please check your internet connection."
      );
      return;
    }

    try {
      const productsList = Object.keys(cartItems)
        .map((id) => {
          const product = products.find((p) => p.id === parseInt(id));
          if (!product) {
            console.warn(`Product with id ${id} not found`);
            return null;
          }
          return {
            productId: id,
            quantity: cartItems[id],
            image: product.image,
            name: product.name,
          };
        })
        .filter((item) => item !== null && item.quantity > 0);

      if (productsList.length === 0) {
        alert("No valid products found in the cart.");
        return;
      }

      const response = await fetch("http://localhost:4000/order", {
        method: "POST",
        body: JSON.stringify({
          amount: totalCartAmount * 100, // Amount should be in the smallest unit (e.g., paise for INR)
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          products: productsList,
          shipping_address: selectedAddress,
        }),
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token") || "",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create order: ${errorText}`);
      }

      const order = await response.json();

      const options = {
        key: "rzp_test_4qWBysCOWmcNPo", // Replace with your Razorpay Key ID
        amount: order.order.amount,
        currency: order.order.currency,
        name: "ShopSj",
        description: "Test Transaction",
        order_id: order.order.orderId,
        handler: async function (response) {
          try {
            const body = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              shipping_address: selectedAddress,
              products: productsList,
            };

            const validateRes = await fetch(
              "http://localhost:4000/order/validate",
              {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                  "Content-Type": "application/json",
                  "auth-token": localStorage.getItem("auth-token") || "",
                },
              }
            );

            if (!validateRes.ok) {
              const errorText = await validateRes.text();
              throw new Error(`Payment validation failed: ${errorText}`);
            }

            const jsonRes = await validateRes.json();
            if (jsonRes.msg === "success") {
              console.log("Payment successful");
              clearCart();
              localStorage.removeItem("cartItems"); // Clear cart items from localStorage on successful payment
              // Handle payment success (e.g., redirect to a success page)
            } else {
              console.error("Payment validation failed:", jsonRes.error);
              alert("Payment validation failed");
            }
          } catch (error) {
            console.error(error);
            alert("Payment validation failed");
          }
        },
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          address: selectedAddress,
        },
        theme: {
          color: "#000000",
        },
      };

      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error);
      alert("Failed to initiate payment");
    }
  };

  if (!products || products.length === 0) {
    return <div className="cartitems">Your cart is empty</div>;
  }

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Image</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {products.map((product) => {
        if (cartItems[product.id] > 0) {
          return (
            <div key={product.id}>
              <div className="cartitems-format-main cartitems-format">
                <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                  className="nav-logo"
                >
                  <img
                    className="cartitems-product-icon"
                    src={product.image}
                    alt={product.name}
                  />
                </Link>

                {/* (product.id, selectedSize); */}
                <p className="cartitems-product-title">{product.name}</p>
                <p>Rs.{product.new_price || 0}</p>
                <div className="cartitems-quantity">
                  <button onClick={() => decreaseQuantity(product.id)}>
                    -
                  </button>
                  <p>{cartItems[product.id]}</p>
                  <button onClick={() => increaseQuantity(product.id)}>
                    +
                  </button>
                </div>
                <p>Rs.{(product.new_price || 0) * cartItems[product.id]}</p>
                <img
                  onClick={() => removeFromCart(product.id)}
                  className="cartitems-remove-icon"
                  src={cross_icon}
                  alt="Remove"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Order Summary</h1>
          <div>
            <hr />
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>Rs.{totalCartAmount}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free Shipping </p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Grand Total</h3>
              <h3>Rs.{totalCartAmount}</h3>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <CheckoutList onSelectAddress={setSelectedAddress} />
            </div>
          </div>
          <button
            className="cartitems-proceed"
            onClick={paymentHandler}
            disabled={!selectedAddress}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
