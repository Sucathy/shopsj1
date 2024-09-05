import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch("http://18.234.167.23/allproducts")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    if (localStorage.getItem("auth-token")) {
      fetch("http://18.234.167.23/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setCartItems(data);
        });
    }
  }, []);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        if (itemInfo !== undefined && itemInfo.new_price !== undefined) {
          totalAmount += cartItems[item] * itemInfo.new_price;
        } else {
          console.error(
            `Product info or new_price is undefined for item with id ${item}.`
          );
          console.log("Product:", itemInfo);
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems.hasOwnProperty(item)) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      // Ensure the item count starts at 0 if it doesn't exist
      const currentCount = prev[itemId] || 0;
      return { ...prev, [itemId]: currentCount + 1 };
    });

    const authToken = localStorage.getItem("auth-token");

    if (authToken) {
      fetch("http://18.234.167.23/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text(); // Change to .text() to handle non-JSON responses
        })
        .then((data) => {
          try {
            const jsonData = JSON.parse(data); // Attempt to parse JSON
            console.log(jsonData);
            // Handle the JSON data if needed
          } catch (error) {
            console.error("Error parsing JSON:", error);
            console.log("Raw response data:", data); // Log raw response data for debugging
          }
        })
        .catch((error) => {
          console.error("Error adding to cart:", error);
        });
    } else {
      console.error("Auth token not found");
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://18.234.167.23/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  const clearCart = () => {
    setCartItems(getDefaultCart());
    if (localStorage.getItem("auth-token")) {
      fetch("http://18.234.167.23/clearcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  const contextValue = {
    products,

    cartItems,
    getTotalCartItems,
    getTotalCartAmount,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
